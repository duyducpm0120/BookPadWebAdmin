import { useAppApolloClient } from '@core/hooks';
import { GetAllPublisher } from '@core';

export const useViewModel = () => {
  const client = useAppApolloClient();
  const {
    data: publisherData,
    loading: getAllPublisherLoading,
    error: getAllPublisherError,
    refetch: getAllPublisherRefetch
  } = GetAllPublisher();

  const reloadPublisherData = async () => {
    await getAllPublisherRefetch();
  };
  const isLoading = getAllPublisherLoading;

  return {
    selector: {
      publisherData,
      isLoading
    },
    handler: {
      reloadPublisherData
    }
  };
};
