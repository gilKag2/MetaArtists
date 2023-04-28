import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { SpinnerLoader } from './';
import { getRelatedArtists } from '../api/spotify';
import { whiteText } from '../commonStyles';
import { useNavigate } from 'react-router-dom';


const RelatedArtist = ({ artistData, onArtistClick }) => (
  <div onClick={() => onArtistClick(artistData.id)} className='flex flex-col gap-2 items-center text-center hover:cursor-pointer hover:bg-gray-200'>
    <img src={artistData?.img} alt={artistData?.name} className='object-contain h-8 w-8 rounded-full' />
    <p className={`${whiteText} text-md`}>{artistData.name}</p>
  </div>
);

const RelatedArtists = ({ artistId }) => {

  const navigate = useNavigate();

  const { data, isError, isLoading, error } = useQuery([ `related+${artistId}` ], getRelatedArtists);


  const onArtistClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  if (isLoading) return <SpinnerLoader />;

  if (isError) return <p className='text-white'>{error}</p>;

  return (
    <>
      <div className='gap-5 flex flex-col items-center pt-5 box-border justify-center'>
        <p className={`${whiteText} text-lg`}>Related Artists</p>
        {data.map(artist => (
          <RelatedArtist key={artist.id} artistData={artist} onArtistClick={onArtistClick} />
        ))}
      </div>
    </>
  );
};

export default RelatedArtists;