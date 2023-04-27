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

  const { register, handleSubmit, formState: { errors }, resetField, setError } = useForm();

  const searchArtistRef = useRef();

  useClickOutsideHandler(searchArtistRef, () => setShowArtistsResults(false));

  const searchArtist = useSearchArtist(setArtistSearchResults);

  const onInputChange = (event) => {
    const searchQuery = event.target.value;

    if (searchQuery.length === 0) {
      setArtistSearchResults([]);
    } else {
      searchArtist(searchQuery);
    }
  };

  const onSubmit = (data) => {

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
    console.log(artist);
  };

  return (
    <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col m-auto gap-8 relative'>
      <div ref={searchArtistRef}>
        <Input
          disabled={selectedArtist}
          onChange={onInputChange}
          type='search'
          name="artistName"
          errorMessage={errors.artistName?.message}
          register={register("artistName")}
          label="Choose Your artist:"
        />
        {showArtistsResults && (
          <div className='absolute left-full mt-2 ml-2'>
            <ArtistSearchResults
              onArtistClick={onArtistClick}
              artistsData={artistSearchResults}
            />
          </div>
        )}
      </div>
      <Input name="prompt" errorMessage={errors.prompt?.message} register={register("prompt")} label="Showcase topic:" />
      <button>
        Create
      </button>
    </form>
  );
};

export default withAuth(CreateShowcase);