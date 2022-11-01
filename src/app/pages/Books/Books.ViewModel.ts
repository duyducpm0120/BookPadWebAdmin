import { useGlobalAlert } from '@core/hooks/useGlobalAlert';
import { BookModel } from './../../../core/models/BookModel';
import { GetAllAuthors } from './../../../core/services/AuthorServices';
import type { BookFilterState } from './Books.types';
import { BookStatusType } from './Books.types';
import type { UploadBookDataType } from '@core';
import { useGlobalLoading, useAuthToken, GetAllBooks, uploadNewBook } from '@core';
import ePub from 'epubjs';
import { isNil, size } from 'lodash';
import { useState } from 'react';
import { AlertType } from '@core/store';

const FILTER_ALL_CONST = 'All';

export const useViewModel = () => {
  const reader = new FileReader();
  const [file, setFile] = useState<File>(new File([], ''));
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [bookData, setBookData] = useState<BookModel>(BookModel.instantiate({}));
  const { authToken } = useAuthToken();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();

  const [filterState, setFilterState] = useState<BookFilterState>({
    name: '',
    status: BookStatusType.active,
    author: ''
  });

  const [isEditBookData, setIsEditBookData] = useState(false);
  const { getAllBooksData, getAllBooksLoading, getAllBooksError, getAllBooksRefetch } =
    GetAllBooks();
  const { getAllAuthorsData, getAllAuthorsLoading, getAllAuthorsError, getAllAuthorsRefetch } =
    GetAllAuthors();
  // useMount(() => {
  //   console.log('getAllBooksData', getAllBooksData);
  // });

  reader.addEventListener(
    'load',
    async (e: any) => {
      const data = e.target.result;
      const book = ePub(data);
      const bookData = await BookModel.instantiateFromBook(book);
      setBookData(bookData);
    },
    false
  );
  const handleInputFileChange = async (event) => {
    resetBookData();
    const newFile = event.target.files[0];
    setFile(newFile);
    setIsFilePicked(true);
    reader.readAsArrayBuffer(newFile);
  };

  const uploadBook = async () => {
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
      getAllBooksRefetch();
      // setMetadata(BookMetadataModel.instantiate({}));
      setBookData(BookModel.instantiate({}));
    } catch (err) {
      console.log('upload book err', err);
      hideGlobalLoading();
      showAlert({
        message: 'Upload book failed',
        type: AlertType.ERROR
      });
    }
  };
  async function handleSubmit(event) {
    event.preventDefault();
    uploadBook();
  }

  const getAuthorsDisplayList = () => {
    let authorsList: any[] = [];
    if (isNil(getAllAuthorsData)) return authorsList;
    authorsList = getAllAuthorsData.map((author) => {
      return {
        label: author.AuthorName,
        value: author.AuthorName
      };
    });
    authorsList.unshift({
      label: FILTER_ALL_CONST,
      value: FILTER_ALL_CONST
    });
    return authorsList;
  };
  const getFilteredData = () => {
    let filteredBookData = getAllBooksData;
    if (filterState.name !== '') {
      filteredBookData = filteredBookData.filter((book) => {
        return book.BookName.toLowerCase().includes(filterState.name.toLowerCase());
      });
    }
    if (filterState.status !== 'active') {
      filteredBookData = [];
    }
    if (filterState.author === FILTER_ALL_CONST) return filteredBookData;
    if (filterState.author !== '') {
      filteredBookData = filteredBookData.filter((book) => {
        if (size(book.Authors) === 0) return false;
        return book.Authors[0].AuthorId === filterState.author;
      });
    }
    return filteredBookData;
  };
  const resetBookData = () => {
    setBookData(BookModel.instantiate({}));
    setFile(new File([], ''));
  };
  const checkIfAuthorExist = () => {
    if (size(bookData.Authors) === 0) return false;
    return (
      getAllAuthorsData.find((author) => author.AuthorName === bookData.Authors[0].AuthorName) !==
      undefined
    );
  };
  return {
    selector: {
      isFilePicked,
      getAllBooksLoading,
      getAllBooksError,
      file,
      filterState,
      getAllBooksData,
      getAllAuthorsData,
      getAllAuthorsLoading,
      getAllAuthorsError,
      bookData,
      isEditBookData
    },
    handler: {
      handleInputFileChange,
      handleSubmit,
      getAllBooksRefetch,
      setFile,
      setFilterState,
      getAllAuthorsRefetch,
      getAuthorsDisplayList,
      getFilteredData,
      uploadBook,
      resetBookData,
      setBookData,
      checkIfAuthorExist,
      setIsEditBookData
    }
  };
};
