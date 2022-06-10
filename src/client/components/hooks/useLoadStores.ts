import { useEffect, useState, useCallback } from 'react';
import useFetch from './useFetch';

import { FetchHook, FetchHookCallback } from './types';

interface StoresState {
  stores: any;
  hasMoreToLoad: boolean;
}

const useLoadStores: FetchHook<StoresState> = () => {
  const [offset, setOffset] = useState(0);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const [stores, setStores] = useState([]);

  const [{ loading, error }, loadStores] = useFetch({
    url: '/api/stores',
    queryParams: {
      offset,
    },
  });

  const loadMoreStores: FetchHookCallback<StoresState> =
    useCallback(async () => {
      const { data: newStores } = await loadStores({
        queryParams: { offset, limit: 30 },
      });

      setHasMoreToLoad(!!newStores.length);
      setOffset((currentOffset) => currentOffset + newStores.length);
      setStores((currentStores) => [...currentStores, ...newStores]);

      return { loading, data: { stores, hasMoreToLoad }, error };
    }, [offset]);

  useEffect(() => {
    loadMoreStores();
  }, []);

  return [{ loading, data: { stores, hasMoreToLoad }, error }, loadMoreStores];
};

export default useLoadStores;
