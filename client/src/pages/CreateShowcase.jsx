import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, ArtistSearchResults, SpinnerLoader } from '../components';
import withAuth from '../hoc/withAuth';
import useSearchArtist from '../hooks/useSearchArtist';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';
import { useParams } from 'react-router-dom';
import useGetArtistData from '../hooks/useGetArtistData';
import { useMutation } from '@tanstack/react-query';
import { createShowcase } from '../api/showcases';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/features/user/userSlice';

const CreateShowcase = () => {
  const currentUser = useSelector(getUser);
  const { artistId } = useParams();
  const [ selectedArtist, setSelectedArtist ] = useState(null);
  const [ artistSearchResults, setArtistSearchResults ] = useState([]);
  const [ showArtistsResults, setShowArtistsResults ] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const searchArtistRef = useRef();

  useClickOutsideHandler(searchArtistRef, () => setShowArtistsResults(false));

  const searchArtist = useSearchArtist(setArtistSearchResults, 'createShowcase', (error) => console.log(error));

  const createShowcaseMutation = useMutation({
    mutationFn: async (prompt) => {
      return await createShowcase(selectedArtist, currentUser.id, prompt);
    },
    onSuccess: (data) => {
      console.log(data);
    }
  });

  const onArtistData = (artistData) => {
    setSelectedArtist(artistData);
    setValue(formControls.artistName, artistData.name, { shouldDirty: true });
  };

  const { error, isError, isLoading } = useGetArtistData(artistId, `artist_id=${artistId}`, onArtistData);



  useEffect(() => {
    if (artistSearchResults.length > 0) {
      setShowArtistsResults(true);
    } else {
      setShowArtistsResults(false);
    }
  }, [ artistSearchResults ]);



  const onInputChange = (event) => {
    const searchQuery = event.target.value;

    if (searchQuery.length === 0) {
      setArtistSearchResults([]);
      setSelectedArtist(null);

    } else {
      setSelectedArtist(null);
      searchArtist(searchQuery);
    }
  };




  const onArtistClick = (artist) => {
    setSelectedArtist(artist);
    setValue(formControls.artistName, artist.name, { shouldDirty: true });
    setArtistSearchResults([]);
  };


  if (isLoading) return <SpinnerLoader />;

  if (isError) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit(data => createShowcaseMutation.mutate(data.prompt))} className='flex flex-col absolute mx-auto gap-8 inset-y-0  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mt-10'>
      <div ref={searchArtistRef} className='relative'>
        {selectedArtist && <img src={selectedArtist.img} alt='' className='mr-2 absolute right-full top-7 object-contain h-8 w-8 rounded-full' />}
        <Input
          disabled={!!artistId}
          onChange={onInputChange}
          type='search'
          name={formControls.artistName}
          errorMessage={errors.artistName?.message}
          register={register(formControls.artistName)}
          label="Choose Your artist:"
        />
      </div>
      {showArtistsResults && (
        <div className='absolute left-full mt-2 ml-2 w-max'>
          <ArtistSearchResults
            onArtistClick={onArtistClick}
            artistsData={artistSearchResults}
          />
        </div>
      )}
      <div className='flex flex-col gap-2 relative max-w-[300px]'>
        <label htmlFor={formControls.prompt} className='text-white font-semibold text-base self-start ml-1'>Showcase topic:</label>
        <textarea
          name={formControls.prompt}
          {...register(formControls.prompt, { required: true, minLength: 3, maxLength: 50 })}
          maxLength={50}
          autoComplete='off'
          spellCheck='false'
          minLength={3}
          rows={2}
          draggable={false}
          placeholder={selectedArtist ? 'lake life' : ''}
          className='flex w-full h-full p-1 flex-1 font-medium rounded-md overflow-hidden border-black border-2 resize-none'
        />
        {errors.prompt && (errors.prompt.type == "required" || errors.prompt.type == "minLength") &&
          <p className={`text-red-500 text-sm absolute inset-0 top-full py-1`}>Cant use a subject shorter then 3 letters</p>}
        {watch(formControls.prompt)?.length === 50 && (
          <div className='text-red-500 text-sm '>You have reached the character limit</div>
        )}

      </div>
      <button type='submit' className='text-white text-center font-bold bg-none pt-2'>
        Create Showcase
      </button>
    </form>
  );
};


const formControls = {
  'artistName': 'artistName',
  'prompt': 'prompt',
};

export default withAuth(CreateShowcase);