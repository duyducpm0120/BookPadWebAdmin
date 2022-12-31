import { useMultipleInputFileHandle } from './../../../core/hooks/useMultipleInputFileHandle';
import { useGlobalAlert } from '@core/hooks/useGlobalAlert';
import { BookModel } from './../../../core/models/BookModel';
import { GetAllAuthors } from './../../../core/services/AuthorServices';
import type { BookFilterState } from './Books.types';
import { BookStatusType } from './Books.types';
import type { UploadBookDataType } from '@core';
import {
  DeleteBook,
  UpdateBook,
  useGlobalLoading,
  useAuthToken,
  GetAllBooks,
  uploadNewBook
} from '@core';
import ePub from 'epubjs';
import { isNil, size } from 'lodash';
import type { ChangeEvent } from 'react';
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
  const { getAllBooksData, getAllBooksLoading, getAllBooksError, getAllBooksRefetch } =
    GetAllBooks();
  const { handleMultiInputFileChange, uploadMultipleBook, bookList, setBookList } =
    useMultipleInputFileHandle({
      getAllBooksRefetch
    });

  const [filterState, setFilterState] = useState<BookFilterState>({
    name: '',
    status: BookStatusType.active,
    author: ''
  });

  const [isEditBookData, setIsEditBookData] = useState(false);

  const { getAllAuthorsData, getAllAuthorsLoading, getAllAuthorsError, getAllAuthorsRefetch } =
    GetAllAuthors();
  // useMount(() => {
  //   console.log('getAllBooksData', getAllBooksData);
  // });
  const { updateBook } = UpdateBook();
  const { deleteBook } = DeleteBook();

  reader.addEventListener(
    'load',
    async (e: any) => {
      const data = e.target.result;
      const book = ePub(data);
      console.log('book asdasd', book);
      const bookData = await BookModel.instantiateFromBook(book);
      setBookData(bookData);
    },
    false
  );
  const handleInputFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    resetBookData();
    const newFile = event.target.files?.[0];
    if (isNil(newFile)) {
      return;
    }
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
        return book.Authors[0].AuthorName === filterState.author;
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
  const isLoading = getAllBooksLoading || getAllAuthorsLoading;
  const isError = getAllBooksError != null || getAllAuthorsError != null;

  const editBook = async () => {
    try {
      showGlobalLoading();
      await updateBook({
        BookDescription: bookData.BookDescription,
        BookId: Number(bookData.BookId),
        BookName: bookData.BookName,
        PublishedAt: bookData.PublishedAt
      });
      hideGlobalLoading();
      showAlert({
        message: 'Update book successfully',
        type: AlertType.SUCCESS
      });
      getAllBooksRefetch();
    } catch (error) {
      hideGlobalLoading();
      showAlert({
        message: 'Update book failed',
        type: AlertType.ERROR
      });
    }
  };
  const deleteBookById = async (bookId: number) => {
    try {
      showGlobalLoading();
      await deleteBook({
        BookId: bookId
      });
      hideGlobalLoading();
      showAlert({
        message: 'Delete book successfully',
        type: AlertType.SUCCESS
      });
      getAllBooksRefetch();
    } catch (error) {
      hideGlobalLoading();
      showAlert({
        message: 'Delete book failed',
        type: AlertType.ERROR
      });
    }
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
      isEditBookData,
      isLoading,
      isError,
      bookList
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
      setIsEditBookData,
      editBook,
      deleteBookById,
      handleMultiInputFileChange,
      uploadMultipleBook,
      setBookList
    }
  };
};
