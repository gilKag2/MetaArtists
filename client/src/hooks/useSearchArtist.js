
import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { useQuery } from '@tanstack/react-query';
import { searchArtist } from '../api/spotify';

const useSearchArtist = (setResultsCallback, queryKey, onQueryError) => {

  const { refetch: startSearch } = useQuery([ queryKey ], searchArtist, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (data) => setResultsCallback(data),
    onError: onQueryError,
  });

  const delayedSearch = useRef(
    debounce((searchQuery) => {
      startSearch(searchQuery);
    }, 500)
  ).current;

  useEffect(() => {
    return () => delayedSearch.cancel();
  }, [ delayedSearch ]);

  return (query) => delayedSearch(query);
};

export default useSearchArtist;