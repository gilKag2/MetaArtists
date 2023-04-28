import React, { useState, useEffect, useRef } from 'react';

import ArtistSearchResults from './ArtistSearchResult';
import useSearchArtist from '../hooks/useSearchArtist';
import { useNavigate } from 'react-router-dom';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';

const SearchBar = () => {
  const [ artistSearchResults, setArtistsSearchResults ] = useState([]);
  const [ showSearchResults, setShowSearchResults ] = useState(false);

  const searchSectionRef = useRef();

  const searchArtist = useSearchArtist(setArtistsSearchResults, 'searchBar', (error) => console.log(error));

  useClickOutsideHandler(searchSectionRef, () => setShowSearchResults(false));

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const searchQuery = event.target.value;

    if (searchQuery.length === 0) {
      setArtistsSearchResults([]);
    } else {
      searchArtist(searchQuery);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    if (artistSearchResults.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [ artistSearchResults ]);

  const onArtistClick = (artist) => {
    navigate(`/artists/${artist.id}`);
    setShowSearchResults(false);
  };

  return (
    <section ref={searchSectionRef} className='fixed top-3 left-1/2 transform -translate-x-1/2 w-1/4 max-w-[250px] z-10' >
      <form role='search' onSubmit={handleSubmit} className="overflow-auto w-full rounded-full focus:outline-none border border-gray-300">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            spellCheck="false"
            className="block w-full p-2 pl-10 text-md font-semibold text-gray-900 rounded-full"
            placeholder="Search artists"
            onChange={handleInputChange}
            onClick={() => setShowSearchResults(prev => !prev)}
          />
        </div>
      </form>
      {showSearchResults && (
        <ArtistSearchResults onArtistClick={onArtistClick} artistsData={artistSearchResults} />
      )}
    </section>
  );
};

export default SearchBar;