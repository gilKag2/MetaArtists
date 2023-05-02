import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getArtistShowcases } from '../api/showcases';
import { SpinnerLoader } from './';
import { useNavigate } from 'react-router-dom';
import { CreateShowcase } from '../pages';

const Showcase = ({ showcaseData }) => {
  return (
    <div className='relative w-full h-full shadow-md box-border'>
      <img className='rounded-md' src={showcaseData.imgUrl} />
    </div>
  );
};


const ArtistShowcases = ({ artistId }) => {

  const [ isCreateMode, setIsCreateMode ] = useState(false);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [ `artist:${artistId}_showcases` ],
    queryFn: async () => {
      return await getArtistShowcases(artistId);
    }
  });

  const navigate = useNavigate();

  const onAddShowcase = () => {
    setIsCreateMode(true);
  };

  if (isError) return <p>{error}</p>;

  if (isLoading) return <SpinnerLoader />;


  return (
    <>
      {isCreateMode ? <CreateShowcase /> : (
        <section className='flex flex-col w-full h-full gap-5'>
          <button onClick={onAddShowcase} className='self-start font-bold text-lg text-white border rounded-lg p-2 hover:bg-slate-300 hover:text-black'>
            + Add New Showcase
          </button>
          <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
            {data.map(showcase => (
              <Showcase key={showcase.id} showcaseData={showcase} />
            ))
            }
          </div>
        </section>
      )}
    </>
  );
};

export default ArtistShowcases;