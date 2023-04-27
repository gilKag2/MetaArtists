import React from 'react';

const ArtistSearchResults = ({ artistsData, onArtistClick }) => (
  <ul className='w-full mt-2 gap-3 hover:cursor-pointer box-border shadow-sm'>
    {artistsData.map(artist => (
      <li onClick={() => onArtistClick(artist)} key={artist.id} className='flex items-center p-2 rounded-md hover:bg-gray-200  text-white hover:text-black'>
        <img src={artist.img} alt='' className='object-contain h-10 w-10 rounded-full' />
        <p className='font-medium ml-2'>{artist.name}</p>
      </li>
    ))}
  </ul>
);
export default ArtistSearchResults;