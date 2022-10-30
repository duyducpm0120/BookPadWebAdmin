import { GetAllAuthors } from './../../../core/services/AuthorServices';
import type { BookFilterState } from './Books.types';
import { BookStatusType } from './Books.types';
import { useAuthToken, GetAllBooks, uploadNewBook } from '@core';
import { BookMetadataModel } from '@core/models/BookMetadataModel';
import type { Book } from 'epubjs';
import ePub from 'epubjs';
import { isNil, size } from 'lodash';
import { useState } from 'react';

const FILTER_ALL_CONST = 'All';

export const useViewModel = () => {
  const reader = new FileReader();
  const [file, setFile] = useState<File>(new File([], ''));
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [cover, setCover] = useState('');
  const [metadata, setMetadata] = useState<BookMetadataModel>(BookMetadataModel.instantiate({}));
  const { authToken } = useAuthToken();
  const getMetadata = async (book: Book) => {
    const metadata = await book.loaded.metadata;
    return metadata;
  };

  const [filterState, setFilterState] = useState<BookFilterState>({
    name: '',
    status: BookStatusType.active,
    author: ''
  });

  const { getAllBooksData, getAllBooksLoading, getAllBooksError, getAllBooksRefetch } =
    GetAllBooks();
  const { getAllAuthorsData, getAllAuthorsLoading, getAllAuthorsError, getAllAuthorsRefetch } =
    GetAllAuthors();
  // useMount(() => {
  //   console.log('getAllBooksData', getAllBooksData);
  // });
  const getCover = async (book: Book) => {
    const cover = await book.loaded.cover;
    return cover;
  };

  const getCoverUrl = async (book: Book) => {
    const coverUrl = await book.coverUrl();
    return coverUrl;
  };

  reader.addEventListener(
    'load',
    async (e: any) => {
      const data = e.target.result;
      const book = ePub(data);
      const metadata = await getMetadata(book);
      setMetadata(BookMetadataModel.instantiate(metadata));
      console.log('metadata', metadata);
      const cover = await getCover(book);
      setCover(cover);
      const coverUrl = await getCoverUrl(book);
      setCoverUrl(isNil(coverUrl) ? '' : coverUrl);
    },
    false
  );
  const handleChange = async (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    setIsFilePicked(true);
    reader.readAsArrayBuffer(newFile);
  };

  const updateBook = async () => {
    try {
      await uploadNewBook({
        bookFile: file,
        bookMetadata: metadata,
        coverUrl,
        token: authToken
      });
      console.log('success upload book');
    } catch (err) {
      console.log('upload book err', err);
    }
  };
  async function handleSubmit(event) {
    event.preventDefault();
    updateBook();
  }

  const getAuthorsDisplayList = () => {
    let authorsList: any[] = [];
    if (isNil(getAllAuthorsData)) return authorsList;
    authorsList = getAllAuthorsData.map((author) => {
      return {
        label: author.AuthorName,
        value: author.AuthorId,
        key: author.AuthorId
      };
    });
    authorsList.unshift({
      label: FILTER_ALL_CONST,
      value: FILTER_ALL_CONST,
      key: FILTER_ALL_CONST
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
  return {
    selector: {
      isFilePicked,
      metadata,
      cover,
      coverUrl,
      getAllBooksLoading,
      getAllBooksError,
      file,
      filterState,
      getAllBooksData,
      getAllAuthorsData,
      getAllAuthorsLoading,
      getAllAuthorsError
    },
    handler: {
      handleChange,
      handleSubmit,
      getAllBooksRefetch,
      setFile,
      setFilterState,
      getAllAuthorsRefetch,
      getAuthorsDisplayList,
      getFilteredData
    }
  };
};
