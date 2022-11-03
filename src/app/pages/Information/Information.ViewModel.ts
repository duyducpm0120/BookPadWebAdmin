import { GetAllAuthors } from './../../../core/services/AuthorServices';
import { useAppApolloClient } from '@core/hooks';
import { GetAllCategories, GetAllPublisher } from '@core';

export const useViewModel = () => {
  const client = useAppApolloClient();
  const {
    data: publisherData,
    loading: getAllPublisherLoading,
    error: getAllPublisherError,
    refetch: getAllPublisherRefetch
  } = GetAllPublisher();
  const {
    getAllAuthorsData: authorsData,
    getAllAuthorsLoading,
    getAllAuthorsError,
    getAllAuthorsRefetch
  } = GetAllAuthors();

  const {
    getAllCategoriesData: categoriesData,
    getAllCategoriesLoading,
    getAllCategoriesError,
    getAllCategoriesRefetch
  } = GetAllCategories();

  const isLoading = getAllPublisherLoading || getAllAuthorsLoading || getAllCategoriesLoading;

  return {
    selector: {
      publisherData,
      isLoading,
      authorsData,
      categoriesData
    },
    handler: {
      getAllPublisherRefetch,
      getAllAuthorsRefetch,
      getAllCategoriesRefetch
    }
  };
};
