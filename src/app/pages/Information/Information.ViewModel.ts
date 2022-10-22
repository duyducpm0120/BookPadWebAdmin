import { GetAllPublisher } from '@core';

export const useViewModel = () => {
  const {
    data: publisherData,
    loading: getAllPublisherLoading,
    error: getAllPublisherError
  } = GetAllPublisher();
  const isLoading = getAllPublisherLoading;

  return {
    selector: {
      publisherData,
      isLoading
    }
  };
};
