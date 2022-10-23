import { Button } from '@mui/material';
import { useState } from 'react';
import ePub from 'epubjs';
import { useMount } from '@core';

const url =
  'https://bookpad.s3.ap-northeast-1.amazonaws.com/e23af7a0-1955-437e-bce8-efde9ba93080.epub?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6IXNJ7VQIQ6ZXHDY%2F20221023%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20221023T150325Z&X-Amz-Expires=3600&X-Amz-Signature=9f534c0b72843643915588a79a1cfe6531f22591944c6e96cf47e5cbd2bdf8cf&X-Amz-SignedHeaders=host&x-id=GetObject';
export const Books = (): JSX.Element => {
  ///
  const [file, setFile] = useState<File>(new File([], ''));
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [coverUrl, setCoverUrl] = useState<any>('');
  const [cover, setCover] = useState('');
  const Book = ePub(url);
  const getMetadata = async () => {
    const metadata = await Book.loaded.metadata;
    return metadata;
  };

  const getCover = async () => {
    const cover = await Book.loaded.cover;
    return cover;
  };

  const getCoverUrl = async () => {
    const coverUrl = await Book.coverUrl();
    return coverUrl;
  };

  useMount(async () => {
    const metadata = await getMetadata();
    console.log('metadata', metadata);
    const cover = await getCover();
    setCover(cover);
    console.log('cover', cover);
    const coverUrl = await getCoverUrl();
    setCoverUrl(coverUrl);
    console.log('coverUrl', coverUrl);
  });

  const reader = new FileReader();

  const handleChange = async (event) => {
    setFile(event.target.files[0]);
    setIsFilePicked(true);
    reader.readAsDataURL(file);
    reader.addEventListener(
      'load',
      (e: any) => {
        const data = e.target.result;
        console.log('e', e);
        console.log('data', data.toString());
        // Book = ePub(data);
        // // reader.readAsArrayBuffer(file);
        // console.log('Book', Book);
      },
      false
    );
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
