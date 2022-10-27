import type { BookFilterState } from './Books.types';
import { useAuthToken, GetAllBooks, useEffectOnceWhen, uploadNewBook } from '@core';
import { BookMetadataModel } from '@core/models/BookMetadataModel';
import type { BookModel } from '@core/models/BookModel';
import type { Book } from 'epubjs';
import ePub from 'epubjs';
import { isNil } from 'lodash';
import { useState } from 'react';

export const useViewModel = () => {
  const reader = new FileReader();
  const [file, setFile] = useState<File>(new File([], ''));
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string>('');
  const [cover, setCover] = useState('');
  const [metadata, setMetadata] = useState<BookMetadataModel>(BookMetadataModel.instantiate({}));
  const { authToken } = useAuthToken();
  const [books, setBooks] = useState<BookModel[]>([]);
  const getMetadata = async (book: Book) => {
    const metadata = await book.loaded.metadata;
    return metadata;
  };

  const [filterState, setFilterState] = useState<BookFilterState>({
    name: '',
    status: '',
    author: ''
  });

  const { getAllBooksData, getAllBooksLoading, getAllBooksError, getAllBooksRefetch } =
    GetAllBooks();

  // useMount(() => {
  //   console.log('getAllBooksData', getAllBooksData);
  // });

  useEffectOnceWhen(!getAllBooksLoading, () => {
    console.log('getAllBooksData', getAllBooksData);
    setBooks(getAllBooksData);
  });

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
  return {
    selector: {
      isFilePicked,
      metadata,
      cover,
      coverUrl,
      books,
      getAllBooksLoading,
      getAllBooksError,
      file,
      filterState
    },
    handler: {
      handleChange,
      handleSubmit,
      getAllBooksRefetch,
      setFile,
      setFilterState
    }
  };
};
