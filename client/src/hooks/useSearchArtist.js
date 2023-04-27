
import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { useMutation } from '@tanstack/react-query';
import { searchArtist } from '../api/spotify';

const useSearchArtist = (setResultsCallback) => {

  const searchArtistMutation = useMutation({
    mutationFn: async searchQuery => {
      return await searchArtist(searchQuery);
    },
    onSuccess: (results) => {
      const { data, status } = results;
      setResultsCallback(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const delayedSearch = useRef(
    debounce((searchQuery) => {
      searchArtistMutation.mutate(searchQuery);
    }, 500)
  ).current;

  useEffect(() => {
    return () => delayedSearch.cancel();
  }, [ delayedSearch ]);


  return (query) => delayedSearch(query);
};

export default useSearchArtist;