import type { BookMetadataModel } from '../models/BookMetadataModel';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { END_POINT } from '@core/const';
export const uploadNewBook = async (params: {
  coverUrl: string;
  bookMetadata: BookMetadataModel;
  bookFile: File;
  token: string;
}) => {
  const { coverUrl, bookMetadata, bookFile, token } = params;
  const imageBlob = await fetch(coverUrl).then(async (r) => await r.blob());
  const url = END_POINT + '/book/upload';
  const formData = new FormData();
  formData.append('img', imageBlob, bookMetadata.title.trim() + '.jpg');
  formData.append('book', bookFile, bookMetadata.title.trim() + '.epub');
  const json = {
    BookName: bookMetadata.title,
    BookDescription: bookMetadata.description
  };
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