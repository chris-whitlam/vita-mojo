import { useState, useCallback } from 'react';
import axios from 'axios';

import { FetchHook, FetchOptions, FetchState } from './types';

const useFetch: FetchHook = ({ url, queryParams = {} }: FetchOptions) => {
  const [state, setState] = useState<FetchState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const callback = useCallback(async (options = {}) => {
    try {
      setState({
        loading: true,
        data: undefined,
        error: undefined,
      });

      const result = await axios.get(url, {
        params: { queryParams, ...options?.queryParams },
        ...options,
      });

      const newState = {
        loading: false,
        data: result.data,
        error: undefined,
      };

      setState(newState);

      return newState;
    } catch (error) {
      console.error(error);

      const newState = {
        loading: false,
        error,
        data: undefined,
      };

      setState(newState);

      return newState;
    }
  }, []);

  return [state, callback];
};

export default useFetch;
