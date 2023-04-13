import React, { useState, useEffect } from 'react';

const SearchBar = () => {

  const [ query, setQuery ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query);
  };

  useEffect(() => {
    // if (!search) return setSearchResults([]);
    let cancel = false;
    // spotifyApi.searchTracks(search).then(res => {
    //   if (cancel) return;
    //   setSearchResults(res.body.tracks.items.map(track => {
    //     const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
    //       if (image.height < smallest.height) return image;
    //       return smallest;
    //     }, track.album.images[ 0 ]);

    //     return {
    //       title: track.name,
    //       artist: track.artists[ 0 ].name,
    //       uri: track.uri,
    //       albumUrl: smallestAlbumImage.url
    //     };
    //   }));
    // });
    return () => cancel = true;
  }, [ query ]);






  return (
    <form role='search' onSubmit={handleSubmit} className="flex items-center overflow-auto mx-auto w-1/4 rounded-full focus:outline-none border border-gray-300">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          spellCheck="false"
          className="block w-full p-2 pl-10 text-md font-semibold text-gray-900 rounded-full  "
          placeholder="Search artists"
          onChange={(event) => setQuery(event.target.value)}
        />

      </div>
    </form>
  );
};

export default SearchBar;