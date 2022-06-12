import React, { FC } from 'react';

import useDownload from './hooks/useDownload';

interface DownloadButtonProps {
  url: string;
  filename: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({
  children,
  url,
  filename,
}) => {
  const [{ error, loading }, handleClick] = useDownload(filename, {
    url,
  });

  return (
    <>
      {loading && <span data-test-id="download-loading">Downloading...</span>}
      {!loading && (
        <button data-test-id="download-button" onClick={() => handleClick()}>
          {children}
        </button>
      )}
      {error && (
        <span data-test-id="download-error">Something went wrong!</span>
      )}
    </>
  );
};

export default DownloadButton;
