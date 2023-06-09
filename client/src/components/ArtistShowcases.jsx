import { useQuery } from '@tanstack/react-query';
import { getArtistShowcases } from '../api/showcases';
import { SpinnerLoader } from './';
import { useLocation, useNavigate } from 'react-router-dom';

const Showcase = ({ showcaseData }) => {
  return (
    <div className='relative w-full h-full shadow-md box-border'>
      <img className='rounded-md' src={showcaseData.imgUrl} />
    </div>
  );
};


const ArtistShowcases = ({ artistId }) => {

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [ `artist:${artistId}_showcases` ],
    queryFn: async () => {
      return await getArtistShowcases(artistId);
    }
  });

  const navigate = useNavigate();
  const location = useLocation();

  const onAddShowcase = () => {
    navigate(`${location.pathname}/create`);
  };

  if (isError) return <p>{error}</p>;

  if (isLoading) return <SpinnerLoader />;


  return (
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
  );
};

export default ArtistShowcases;