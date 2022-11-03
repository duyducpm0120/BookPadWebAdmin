import { EDIT_BOOK } from './../queries/Book.query';
import { BookModel } from './../models/BookModel';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { END_POINT } from '@core/const';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_BOOK } from '@core/queries';
export interface UploadBookDataType {
  BookName: string;
  BookDescription: string;
  LanguageName: string;
  PublisherName: string;
  AuthorName: string;
  BookPublishedAt: string;
}
export const uploadNewBook = async (params: {
  coverUrl: string;
  bookData: UploadBookDataType;
  bookFile: File;
  token: string;
}) => {
  const { coverUrl, bookData, bookFile, token } = params;
  const imageBlob = await fetch(coverUrl).then(async (r) => await r.blob());
  const url = END_POINT + '/book/upload';
  const formData = new FormData();
  formData.append('img', imageBlob, bookData.BookName.trim() + '.jpg');
  formData.append('book', bookFile, bookData.BookName.trim() + '.epub');
  const json = bookData;
  formData.append('json', JSON.stringify(json));

  console.log('formData', formData);
  const config: AxiosRequestConfig = {
    headers: {
      // 'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  };
  return await axios.post(url, formData, config);
};

export const GetAllBooks = () => {
  const { data, error, loading, refetch } = useQuery(GET_ALL_BOOK);
  const booksData = BookModel.instantiateList(data);
  return {
    getAllBooksData: booksData,
    getAllBooksError: error,
    getAllBooksLoading: loading,
    getAllBooksRefetch: refetch
  };
};

export const EditBook = () => {
  const [editBookFunc, { data, error, loading }] = useMutation(EDIT_BOOK);
  // const { data, error, loading, refetch } = useQuery(CREATE_AUTHOR);
  const bookModel = BookModel.instantiate(data);
  return {
    editBookData: bookModel,
    editBookError: error,
    editBookLoading: loading,
    editBookFunc
  };
};
