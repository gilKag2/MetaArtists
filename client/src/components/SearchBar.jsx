import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { searchArtist } from '../api/spotify';
import debounce from 'lodash/debounce';
import ArtistSearchResult from './ArtistSearchResult';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';

const SearchBar = () => {
  const [ query, setQuery ] = useState('');
  const [ artistSearchResults, setArtistsSearchResults ] = useState([]);
  const [ showSearchResults, setShowSearchResults ] = useState(false);

  const searchSectionRef = useRef();

  useClickOutsideHandler(searchSectionRef, () => setShowSearchResults(false));


  const searchArtistMutation = useMutation({
    mutationFn: async searchQuery => {
      return await searchArtist(searchQuery);
    },
    onSuccess: (results) => {
      const { data, status } = results;
      setArtistsSearchResults(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const delayedSearch = useRef(
    debounce((searchQuery) => {
      searchArtistMutation.mutate(searchQuery);
    }, 500)
  ).current;


  const handleInputChange = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length === 0) {
      setArtistsSearchResults([]);
    } else {
      delayedSearch(searchQuery);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    return () => delayedSearch.cancel();
  }, [ delayedSearch ]);

  useEffect(() => {
    if (artistSearchResults.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [ artistSearchResults ]);


  return (
    <section ref={searchSectionRef} className='fixed top-4 left-1/2 transform -translate-x-1/2 w-1/4 max-w-[250px]' >
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
      {showSearchResults && <ArtistSearchResult artistsData={artistSearchResults} />}
    </section>
  );
};

export default SearchBar;