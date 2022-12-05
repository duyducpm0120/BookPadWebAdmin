import type { UploadBookDataType } from '@core';
import { BookModel, uploadNewBook } from '@core';
import { AlertType } from '@core/store';
import ePub from 'epubjs';
import { isNil, size } from 'lodash';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useAuthToken } from './useAuthToken';
import { useGlobalAlert } from './useGlobalAlert';
import { useGlobalLoading } from './useGlobalLoading';

export const useMultipleInputFileHandle = (params: { getAllBooksRefetch: () => void }) => {
  const { getAllBooksRefetch } = params;

  const [files, setFiles] = useState<File[]>([]);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const bookList = useRef<BookModel[]>([]);
  const { authToken } = useAuthToken();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();
  //   reader.addEventListener(
  //     'load',
  //     async (e: any) => {
  //       const data = e.target.result;
  //       const book = ePub(data);
  //       console.log('book asdasd', book);
  //       const bookData = await BookModel.instantiateFromBook(book);
  //       bookList.current.push(bookData);
  //     },
  //     false
  //   );

  const handleMultiInputFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // resetBookData();
    const newFiles = event.target.files;
    if (isNil(newFiles)) {
      return;
    }
    const newFilesArray = Array.from(newFiles);
    newFilesArray.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        async (e: any) => {
          const data = e.target.result;
          const book = ePub(data);
          console.log('book asdasd', book);
          const bookData = await BookModel.instantiateFromBook(book);
          bookList.current.push(bookData);
        },
        false
      );
      reader.readAsArrayBuffer(file);
    });
    setFiles(newFilesArray);
    setIsFilePicked(true);
  };
  const uploadBook = async (file: File, bookData: BookModel) => {
    try {
      showGlobalLoading();
      const data: UploadBookDataType = {
        BookName: bookData.BookName,
        BookDescription: bookData.BookDescription,
        LanguageName: bookData.Languages[0],
        PublisherName: bookData.BookPublisher.PublisherName,
        AuthorName: size(bookData.Authors) > 0 ? bookData.Authors[0].AuthorName : '',
        BookPublishedAt: bookData.PublishedAt
      };
      await uploadNewBook({
        bookFile: file,
        bookData: data,
        coverUrl: bookData.BookCoverImage,
        token: authToken
      });
      hideGlobalLoading();
      showAlert({
        message: 'Upload book successfully',
        type: AlertType.SUCCESS
      });
      //   getAllBooksRefetch();
      // setMetadata(BookMetadataModel.instantiate({}));
      //   setBookData(BookModel.instantiate({}));
    } catch (err) {
      hideGlobalLoading();
      showAlert({
        message: 'Upload book failed',
        type: AlertType.ERROR
      });
    }
  };
  async function uploadMultipleBook() {
    console.log('bookList.current', bookList.current);
    console.log('files[0]', files[0]);
    console.log('bookList.current[0]', bookList.current[0]);
    // uploadBook();
    // await uploadBook(files[0], bookList.current[0]);
    for (let i = 0; i < files.length; i++) {
      await uploadBook(files[i], bookList.current[i]);
    }
    getAllBooksRefetch();
  }

  return {
    handleMultiInputFileChange,
    isFilePicked,
    uploadMultipleBook
  };
};
