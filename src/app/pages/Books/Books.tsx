import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export const Books = (): JSX.Element => {
  ///
  const [file, setFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
    setIsFilePicked(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }
  return (
    <div>
      {isFilePicked ? (
        <div>
          <p>Filename: {file.name}</p>
          <p>Filetype: {file.type}</p>
          <p>Size in bytes: {file.size}</p>
          <p>lastModifiedDate: {file.lastModifiedDate.toLocaleDateString()}</p>
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
