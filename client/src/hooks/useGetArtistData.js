
import { useQuery } from '@tanstack/react-query';
import { getArtistData } from '../api/spotify';
import { useEffect } from 'react';

const useGetArtistData = (artistId, queryKey, setArtistData, shouldWait = false) => {

  const { refetch: startRequest, error, isError, isLoading } = useQuery({
    queryKey: [ queryKey ],
    queryFn: async () => await getArtistData(artistId),
    onSuccess: (data) => setArtistData(data),
    refetchOnWindowFocus: false,
    enabled: false,

  });

  useEffect(() => {
    if (!artistId) return;

    if (!shouldWait) {
      startRequest();
    }

  }, [ artistId ]);


  return shouldWait ? [ startRequest, error, is, isError, isLoading ] : [ error, isError, isLoading ];

};

export default useGetArtistData;