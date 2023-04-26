import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getArtistShowcases } from '../api/showcases';
import { SpinnerLoader } from './';

const Showcase = ({ showcaseData }) => {
  return (
    <div className='relative w-full h-full shadow-md box-border'>
      <img className='rounded-md' src={showcaseData.imgUrl} />
    </div>
  );
};


const ArtistShowcases = ({ artistId }) => {
  const [ showcases, setShowcases ] = useState([]);

  const getArtistShowcasesMutation = useMutation({
    mutationFn: async () => {
      return await getArtistShowcases(artistId);
    },
    onSuccess: (responseData) => {
      const { data, status } = responseData;
      setShowcases(data);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    if (!artistId) return;
    getArtistShowcasesMutation.mutate();
  }, []);

  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
      {getArtistShowcasesMutation.isLoading ? <SpinnerLoader /> : (
        showcases.map(showcase => (
          <Showcase key={showcase.id} showcaseData={showcase} />
        ))
      )}
    </div>
  );
};

export default ArtistShowcases;