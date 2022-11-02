import { CREATE_AUTHOR } from './../queries/Author.query';
import { useMutation, useQuery } from '@apollo/client';
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

export const CreateAuthor = () => {
  const [createAuthorFunc, { data, error, loading }] = useMutation(CREATE_AUTHOR);
  // const { data, error, loading, refetch } = useQuery(CREATE_AUTHOR);
  const authorsData = AuthorModel.instantiateArray(data);
  return {
    createAuthorData: authorsData,
    createAuthorError: error,
    createAuthorLoading: loading,
    createAuthorFunc
  };
};
