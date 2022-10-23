import { Button } from '@mui/material';
import { useState } from 'react';
import type { Book } from 'epubjs';
import ePub from 'epubjs';
import { useMount } from '@core';

export const Books = (): JSX.Element => {
  ///
  const reader = new FileReader();
  const [file, setFile] = useState<File>(new File([], ''));
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [coverUrl, setCoverUrl] = useState<any>('');
  const [cover, setCover] = useState('');
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

  useMount(async () => {
    // const metadata = await getMetadata(Book);
    // console.log('metadata', metadata);
    // const cover = await getCover(Book);
    // setCover(cover);
    // console.log('cover', cover);
    // const coverUrl = await getCoverUrl(Book);
    // setCoverUrl(coverUrl);
    // console.log('coverUrl', coverUrl);
  });

  reader.addEventListener(
    'load',
    async (e: any) => {
      const data = e.target.result;
      console.log('e', e);
      console.log('data', data.toString());
      const book = ePub(data);
      console.log('Book', book);
      const cover = await getCover(book);
      setCover(cover);
      console.log('cover', cover);
      const coverUrl = await getCoverUrl(book);
      setCoverUrl(coverUrl);
      console.log('coverUrl', coverUrl);
    },
    false
  );
  const handleChange = async (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    setIsFilePicked(true);
    reader.readAsArrayBuffer(newFile);
  };

  function handleSubmit(event) {
    event.preventDefault();
    // const url = 'http://localhost:3000/uploadFile';
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('fileName', file.name);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // };
    // axios.post(url, formData, config).then((response) => {
    //   console.log(response.data);
    // });
  }
  return (
    <div>
      {isFilePicked ? (
        <div>
          <p>Filename: {file.name}</p>
          <p>Filetype: {file.type}</p>
          <p>Size in bytes: {file.size}</p>
          {/* <p>lastModifiedDate: {file?.lastModifiedDate?.toLocaleDateString()}</p> */}
          <p>Path: {URL.createObjectURL(file)}</p>
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
