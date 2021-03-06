import { useEffect, useState, useCallback } from 'react';
import useFetch from './useFetch';

import {
  FetchHookCallback,
  FetchHookCallbackOptions,
  FetchHookReturnValue,
} from './types';
import { Filters } from '../Filters';

interface StoresState {
  stores: any;
  hasMoreToLoad: boolean;
}

type LoadStoresHook = (filters: Filters) => FetchHookReturnValue<StoresState>;

const useLoadStores: LoadStoresHook = (filters: Filters = {}) => {
  const [offset, setOffset] = useState(0);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const [stores, setStores] = useState([]);

  const [{ loading, error }, loadStores] = useFetch({
    url: '/api/stores',
    queryParams: {
      ...filters,
      offset,
    },
  });

  const loadMoreStores: FetchHookCallback<StoresState> = useCallback(
    async (options: FetchHookCallbackOptions = {}) => {
      const { data: newStores } = await loadStores({
        queryParams: { ...filters, ...options?.queryParams },
      });

      if (newStores.length) {
        setHasMoreToLoad(!!newStores.length);
        setOffset((currentOffset) => currentOffset + newStores.length);
        setStores((currentStores) => [...currentStores, ...newStores]);
      }

      return { loading, data: { stores, hasMoreToLoad }, error };
    },
    [offset, filters],
  );

  useEffect(() => {
    setOffset(0);
    setHasMoreToLoad(true);
    setStores([]);
    loadMoreStores({ queryParams: { offset: 0 } });
  }, [filters]);

  const newState = { loading, data: { stores, hasMoreToLoad }, error };
  return [newState, loadMoreStores];
};

export default useLoadStores;
