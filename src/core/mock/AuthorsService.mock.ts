import { AuthorModel } from '@core';
import { delay } from 'lodash';
export const mockAuthorServices = async (): Promise<{
  data: AuthorModel[];
  loading: boolean;
  error: null;
}> => {
  const authors = [
    AuthorModel.instantiate({
      AuthorId: 1,
      AuthorName: 'Author 1'
    }),
    AuthorModel.instantiate({
      AuthorId: 2,
      AuthorName: 'Author 2'
    }),
    AuthorModel.instantiate({
      AuthorId: 3,
      AuthorName: 'Author 3'
    })
  ];
  delay(() => {}, 2000);
  return {
    data: authors,
    loading: false,
    error: null
  };
};
