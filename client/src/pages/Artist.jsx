import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistData } from '../api/spotify';
import { whiteText } from '../commonStyles';
import { SpinnerLoader, ArtistShowcases, RelatedArtists } from '../components';



const ArtistDetails = ({ artistData }) => (
  <div className='flex flex-col h-full w-full items-center text-center gap-4'>
    <img src={artistData?.img} alt={artistData?.name} className='object-contain rounded-full' />
    <p className={`${whiteText} text-lg`}>{artistData.name}</p>
    <div className='flex flex-col items-center'>
      <p className='text-slate-300 font-medium'>Followed by</p>
      <p className='text-slate-300 font-medium'>5</p>
    </div>
    <div className='flex flex-col items-center'>
      <p className='text-slate-300 font-medium'>Showcases count</p>
      <p className='text-slate-300 font-medium'>5</p>
    </div>
  </div>
);

const ArtistPage = () => {
  const [ artistData, setArtistData ] = useState(null);
  const { artistId } = useParams();

  const getArtistDataMutation = useMutation({
    mutationFn: async artistId => {
      return await getArtistData(artistId);
    },
    onSuccess: (responseData) => {
      const { data, status } = responseData;
      setArtistData(data);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    if (!artistId) return;
    getArtistDataMutation.mutate(artistId);

  }, [ artistId ]);

  if (!artistData) return <p>Error...</p>;
  return (
    <>
      {getArtistDataMutation.isLoading ? <SpinnerLoader /> : (
        <article className='flex w-full h-full justify-between'>
          <div className='w-1/4 h-full px-2 flex justify-center'>
            <ArtistDetails artistData={artistData} />
          </div>
          <div className='p-6'>
            <ArtistShowcases artistId={artistId} />
          </div>
          <div className='w-1/6 mr-2 items-center justify-center'>
            <RelatedArtists artistId={artistId} />
          </div>
        </article>
      )}
    </>
  );
};

export default ArtistPage;