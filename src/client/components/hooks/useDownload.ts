import { useState } from 'react';
import axios from 'axios';

import { FetchOptions, FetchState, FetchHookReturnValue } from './types';

export type DownloadHook<T> = (
  filename: string,
  options?: FetchOptions,
) => FetchHookReturnValue<T>;

const handleDownload = async (
  url: string,
  filename: string,
  contentType = 'text/csv',
) => {
  const result = await axios.get(url, {
    headers: {
      Accept: contentType,
    },
  });

  const blob = new Blob([result.data], {
    type: `${contentType};charset=utf-8;`,
  });

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return result.data;
};

const useDownload: DownloadHook<any> = (
  filename: string,
  { url }: FetchOptions,
) => {
  const [state, setState] = useState<FetchState<any>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const callback = async () => {
    setState({
      loading: true,
      data: undefined,
      error: undefined,
    });

    try {
      const data = await handleDownload(url, filename);

      const newState = {
        loading: false,
        data,
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

export default useDownload;
