import { getAllPublisher } from '@core';
import { useEffect } from 'react';

export const useViewModel = () => {
  const {
    data: publisherData,
    loading: getAllPublisherLoading,
    error: getAllPublisherError
  } = getAllPublisher();

  const isLoading = getAllPublisherLoading;
  useEffect(() => {
    if (!getAllPublisherLoading) console.log('data', publisherData);
  }, [publisherData, getAllPublisherLoading]);
  return {
    selector: {
      publisherData,
      isLoading
    }
  };
};
