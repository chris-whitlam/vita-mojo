import { useEffect, useState, useCallback } from 'react';
import useFetch from './useFetch';

import { FetchHook, FetchHookCallback } from './types';

const useLoadStores: FetchHook = () => {
  const [offset, setOffset] = useState(0);
  const [stores, setStores] = useState([]);

  const [{ loading, error }, loadStores] = useFetch({
    url: '/api/stores',
    queryParams: {
      offset,
    },
  });

  const loadMoreStores: FetchHookCallback = useCallback(async () => {
    const { data: newData } = await loadStores({
      queryParams: { offset, limit: 30 },
    });

    setOffset((currentOffset) => currentOffset + newData.length);
    setStores((currentStores) => [...currentStores, ...newData]);

    return { loading, data: newData, error };
  }, [offset]);

  useEffect(() => {
    loadMoreStores();
  }, []);

  return [{ loading, data: stores, error }, loadMoreStores];
};

export default useLoadStores;
