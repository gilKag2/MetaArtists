// import React from 'react'

// const ShowcaseCreator = () => {

//   const [ selectedArtist, setSelectedArtist ] = useState(null);
//   const [ artistSearchResults, setArtistSearchResults ] = useState([]);
//   const [ showArtistsResults, setShowArtistsResults ] = useState(false);

//   const { register, handleSubmit, formState: { errors }, resetField, setError, setValue } = useForm();

//   const searchArtistRef = useRef();

//   useClickOutsideHandler(searchArtistRef, () => setShowArtistsResults(false));

//   const searchArtist = useSearchArtist(setArtistSearchResults, 'createShowcase', (error) => console.log(error));

//   useEffect(() => {
//     if (artistSearchResults.length > 0) {
//       setShowArtistsResults(true);
//     } else {
//       setShowArtistsResults(false);
//     }
//   }, [ artistSearchResults ]);


//   const onInputChange = (event) => {
//     const searchQuery = event.target.value;

//     if (searchQuery.length === 0) {
//       setArtistSearchResults([]);
//       setSelectedArtist(null);

//     } else {
//       setSelectedArtist(null);
//       searchArtist(searchQuery);
//     }
//   };



//   const onCreateShowcase = (data) => {
//     console.log(data);
//   };

//   const onArtistClick = (artist) => {
//     setSelectedArtist(artist);
//     setValue(formControls.artistName, artist.name, { shouldDirty: true });
//     setArtistSearchResults([]);
//   };

//   return (
//     <form onSubmit={handleSubmit(data => onCreateShowcase(data))} className='flex flex-col  m-auto gap-8 relative'>
//       <div ref={searchArtistRef} className='relative'>
//         {selectedArtist && <img src={selectedArtist.img} alt='' className='mr-2 absolute right-full top-7 object-contain h-8 w-8 rounded-full' />}
//         <Input
//           onChange={onInputChange}
//           type='search'
//           name={formControls.artistName}
//           errorMessage={errors.artistName?.message}
//           register={register(formControls.artistName)}
//           label="Choose Your artist:"
//         />
//       </div>
//       {showArtistsResults && (
//         <div className='absolute left-full mt-2 ml-2 w-max'>
//           <ArtistSearchResults
//             onArtistClick={onArtistClick}
//             artistsData={artistSearchResults}
//           />
//         </div>
//       )}
//       <Input name={formControls.prompt} errorMessage={errors.prompt?.message} register={register(formControls.prompt)} label="Showcase topic:" />
//       <button type='submit' className='text-white text-center font-bold bg-none'>
//         Create Showcase
//       </button>
//     </form>
//   );
// }

// const formControls = {
//   'artistName': 'artistName',
//   'prompt': 'prompt',
// };


// export default ShowcaseCreator