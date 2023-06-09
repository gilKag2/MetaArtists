import { useQuery } from '@tanstack/react-query';
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
  const { artistId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [ `artist_id=${artistId}` ],
    queryFn: async () => await getArtistData(artistId)
  });

  if (isLoading) return <SpinnerLoader />;

  if (isError) return <p>{error}</p>;

  return (
    <>
      <article className='flex w-full h-full justify-between'>
        <div className='w-1/4 h-full px-2 flex justify-center'>
          <ArtistDetails artistData={data} />
        </div>
        <div className='flex flex-col p-6'>
          <ArtistShowcases artistId={artistId} />
        </div>
        <div className='w-1/6 mr-2 items-center justify-center'>
          <RelatedArtists artistId={artistId} />
        </div>
      </article>
    </>
  );
};

export default ArtistPage;