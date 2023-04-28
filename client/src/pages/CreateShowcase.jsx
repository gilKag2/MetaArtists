import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, ArtistSearchResults } from '../components';
import withAuth from '../hoc/withAuth';
import useSearchArtist from '../hooks/useSearchArtist';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler';

const CreateShowcase = () => {
  const [ selectedArtist, setSelectedArtist ] = useState(null);
  const [ artistSearchResults, setArtistSearchResults ] = useState([]);
  const [ showArtistsResults, setShowArtistsResults ] = useState(false);

  const { register, handleSubmit, formState: { errors }, resetField, setError, setValue } = useForm();

  const searchArtistRef = useRef();

  useClickOutsideHandler(searchArtistRef, () => setShowArtistsResults(false));

  const searchArtist = useSearchArtist(setArtistSearchResults, 'createShowcase', (error) => console.log(error));


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

  const onCreateShowcase = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (artistSearchResults.length > 0) {
      setShowArtistsResults(true);
    } else {
      setShowArtistsResults(false);
    }
  }, [ artistSearchResults ]);


  const onArtistClick = (artist) => {
    setSelectedArtist(artist);
    setValue('artistName', artist.name, { shouldDirty: true });
    setArtistSearchResults([]);
  };

  return (
    <form onSubmit={handleSubmit(data => onCreateShowcase(data))} className='flex flex-col m-auto gap-8 relative'>
      <div ref={searchArtistRef} className='relative'>
        {selectedArtist && <img src={selectedArtist.img} alt='' className='mr-2 absolute right-full top-7 object-contain h-8 w-8 rounded-full' />}
        <Input
          onChange={onInputChange}
          type='search'
          name="artistName"
          errorMessage={errors.artistName?.message}
          register={register("artistName")}
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
      <Input name="prompt" errorMessage={errors.prompt?.message} register={register("prompt")} label="Showcase topic:" />
      <button type='submit'>
        Create
      </button>
    </form>
  );
};

export default withAuth(CreateShowcase);