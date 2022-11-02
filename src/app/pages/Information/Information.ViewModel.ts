import { GetAllAuthors } from './../../../core/services/AuthorServices';
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
  const {
    getAllAuthorsData: authorData,
    getAllAuthorsLoading,
    getAllAuthorsError,
    getAllAuthorsRefetch
  } = GetAllAuthors();

  const reloadPublisherData = async () => {
    await getAllPublisherRefetch();
  };
  const isLoading = getAllPublisherLoading || getAllAuthorsLoading;

  return {
    selector: {
      publisherData,
      isLoading,
      authorData
    },
    handler: {
      reloadPublisherData,
      getAllAuthorsRefetch
    }
  };
};
