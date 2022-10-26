import { Button } from '@mui/material';
import { useState } from 'react';
import type { Book } from 'epubjs';
import ePub from 'epubjs';
import { BookMetadataModel } from '@core/models/BookMetadataModel';
import { uploadNewBook, useAuthToken } from '@core';
import { isNil } from 'lodash';

export const Books = (): JSX.Element => {
  ///
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
  return (
    <div>
      {isFilePicked ? (
        <div>
          {/* <p>lastModifiedDate: {file?.lastModifiedDate?.toLocaleDateString()}</p> */}
          <p>Path: {URL.createObjectURL(file)}</p>
          {Object.keys(metadata).map((key, index) => {
            return (
              <p key={-index}>
                {key}: {metadata[key]}
              </p>
            );
          })}

          <img src={coverUrl} width={300} height={300}></img>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleChange} accept=".epub" />
      </Button>
      <button type="submit" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
};
