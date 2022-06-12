import { useState } from 'react';
import axios from 'axios';

import {
  FetchHook,
  FetchHookCallbackOptions,
  FetchOptions,
  FetchState,
} from './types';

const useFetch: FetchHook<any> = ({
  url,
  queryParams,
  headers,
}: FetchOptions) => {
  const [state, setState] = useState<FetchState<any>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const callback = async (options: FetchHookCallbackOptions = {}) => {
    setState({
      loading: true,
      data: undefined,
      error: undefined,
    });

    try {
      const result = await axios.get(url, {
        params: { ...queryParams, ...options?.queryParams },
        headers,
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
  };

  return [state, callback];
};

export default useFetch;
