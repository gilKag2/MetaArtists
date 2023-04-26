import { useMutation } from '@tanstack/react-query';
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
  const [ relatedArtists, setRelatedArtists ] = useState([]);

  const navigate = useNavigate();

  const getRelatedArtistMutation = useMutation({
    mutationFn: async () => {
      return await getRelatedArtists(artistId);
    }, onSuccess: (responseData) => {
      const { data, status } = responseData;
      setRelatedArtists(data);
    }, onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    if (!artistId) return;
    getRelatedArtistMutation.mutate(artistId);

  }, [ artistId ]);


  const onArtistClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };


  return (
    <>
      {getRelatedArtistMutation.isLoading ? <SpinnerLoader /> : (
        <div className='gap-5 flex flex-col items-center pt-5 box-border justify-center'>
          <p className={`${whiteText} text-lg`}>Related Artists</p>
          {relatedArtists.map(artist => (
            <RelatedArtist key={artist.id} artistData={artist} onArtistClick={onArtistClick} />
          ))}
        </div>
      )}
    </>
  );
};

export default RelatedArtists;