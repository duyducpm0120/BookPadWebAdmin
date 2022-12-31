import { BlankSpacer } from '@app/components';
import type { AuthorModel, BookModel } from '@core';
import { DeleteIcon, SPACE } from '@core';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { useStyles } from '../Books.styles';
import BookIcon from '@mui/icons-material/Book';
import type { ChangeEvent } from 'react';

export const AddNewBooksUI = (props: {
  bookData: BookModel;
  handleInputFileChange: (event: any) => Promise<void>;
  setBookData: (value: React.SetStateAction<BookModel>) => void;
  getAllAuthorsData: AuthorModel[];
  getAuthorsDisplayList: () => any[];
  checkIfAuthorExist: () => boolean;
  getAllBooksRefetch: () => void;
  bookList: BookModel[];
  setBookList: (value: React.SetStateAction<BookModel[]>) => void;
  handleMultiInputFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}) => {
  const {
    bookData,
    handleInputFileChange,
    setBookData,
    getAllAuthorsData,
    getAuthorsDisplayList,
    checkIfAuthorExist,
    bookList,
    setBookList,
    handleMultiInputFileChange
  } = props;
  const styles = useStyles();

  const newBookComp = (book: BookModel) => {
    return (
      <Card
        style={{
          width: '100%',
          height: 50,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: SPACE.spacing12,
          marginBottom: SPACE.spacing12
        }}>
        <Typography variant="body2" color="text.secondary">
          {book.BookName}
        </Typography>
        <IconButton
          onClick={() => {
            setBookList(bookList.filter((item) => item.BookName !== book.BookName));
          }}>
          <DeleteIcon />
        </IconButton>
      </Card>
    );
  };

  return (
    <Box className={styles.addNewBookWrapper}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 250
        }}>
        {/* <input type="file" onChange={handleInputFileChange} accept=".epub" title="asdasd" /> */}
        <input
          type="file"
          // hidden
          onChange={handleMultiInputFileChange}
          accept=".epub"
          style={{
            flex: 1,
            backgroundColor: 'red',
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: 250,
            opacity: 0,
            cursor: 'pointer'
          }}
          multiple
        />
        {bookData.BookCoverImage !== '' ? (
          <img
            style={{
              width: 'auto',
              height: 250
            }}
            src={bookData.BookCoverImage}></img>
        ) : (
          <BookIcon
            style={{
              width: 'auto',
              height: 250,
              resize: 'vertical'
            }}
            cursor="pointer"
            onClick={() => {}}></BookIcon>
        )}
      </Box>
      <BlankSpacer height={SPACE.spacing12} />
      {bookList.map((item, index) => {
        return newBookComp(item);
      })}
    </Box>
  );
};
