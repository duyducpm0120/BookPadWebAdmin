import { useQuery } from '@apollo/client';
import { AuthorModel } from '@core';
import { GET_ALL_AUTHORS } from '@core/queries';
export const GetAllAuthors = () => {
  const { data, error, loading, refetch } = useQuery(GET_ALL_AUTHORS);
  const authorsData = AuthorModel.instantiateArray(data);
  return {
    getAllAuthorsData: authorsData,
    getAllAuthorsError: error,
    getAllAuthorsLoading: loading,
    getAllAuthorsRefetch: refetch
  };
};
