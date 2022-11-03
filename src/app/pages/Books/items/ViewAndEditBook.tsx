import { BlankSpacer, BPTextField } from '@app/components';
import type { AuthorModel, BookModel } from '@core';
import { SPACE, strings } from '@core';
import { Box } from '@mui/material';
import { useStyles } from '../Books.styles';

export const ViewAndEditBookUI = (props: {
  bookData: BookModel;
  handleInputFileChange: (event: any) => Promise<void>;
  setBookData: (value: React.SetStateAction<BookModel>) => void;
  getAllAuthorsData: AuthorModel[];
  getAuthorsDisplayList: () => any[];
  checkIfAuthorExist: () => boolean;
  isEditBookData: boolean;
}) => {
  const {
    bookData,
    handleInputFileChange,
    setBookData,
    getAllAuthorsData,
    getAuthorsDisplayList,
    checkIfAuthorExist,
    isEditBookData
  } = props;
  const styles = useStyles();
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
        <img
          style={{
            width: 'auto',
            height: 250
          }}
          src={bookData.BookCoverImage}></img>
      </Box>
      <BlankSpacer height={SPACE.spacing12} />
      <BPTextField
        disabled={!isEditBookData}
        //  ref={newPublisherNameRef}
        label={strings.title}
        autoFocus
        fullWidth
        value={bookData.BookName}
        onChange={(e) => {
          setBookData({ ...bookData, BookName: e.target.value });
        }}
        // error={!isAddNewPublisherValid}
        // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
      />
      <BlankSpacer height={SPACE.spacing12} />
      <BPTextField
        disabled
        label={strings.author}
        value={checkIfAuthorExist() ? bookData.Authors[0].AuthorName : ''}
        onChange={(e) => {
          setBookData({
            ...bookData,
            Authors: [
              {
                AuthorName: e.target.value,
                AuthorId: '',
                AuthorDescription: ''
              }
            ]
          });
        }}
        multiSelectParams={{
          options: getAuthorsDisplayList()
        }}></BPTextField>

      <BlankSpacer height={SPACE.spacing12} />
      <BPTextField
        disabled
        //  ref={newPublisherNameRef}
        label={strings.publisher_name}
        autoFocus
        fullWidth
        value={bookData.BookPublisher.PublisherName}
        onChange={(e) => {
          setBookData({
            ...bookData,
            BookPublisher: {
              PublisherName: e.target.value,
              PublisherId: bookData.BookPublisher.PublisherId,
              PublisherDescription: bookData.BookPublisher.PublisherDescription
            }
          });
        }}
        // error={!isAddNewPublisherValid}
        // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
      />
      <BlankSpacer height={SPACE.spacing12} />
      <BPTextField
        disabled={!isEditBookData}
        // id="datetime-local"
        label={strings.publish_date}
        type="datetime-local"
        value={bookData.PublishedAt}
        // sx={{ width: 250 }}
        onChange={(e) => {
          setBookData({ ...bookData, PublishedAt: e.target.value });
        }}
      />
      <BlankSpacer height={SPACE.spacing12} />
      <BPTextField
        disabled={!isEditBookData}
        //  ref={newPublisherDescriptionRef}
        label={strings.book_description}
        fullWidth
        value={bookData.BookDescription}
        onChange={(e) => {
          setBookData({ ...bookData, BookDescription: e.target.value });
          //  setPublisherDescription(e.target.value);
        }}
        multiline
        numberOfLines={10}
        // error={!isAddNewPublisherValid}
        // errorText={!isAddNewPublisherValid ? strings.publisher_description_required : ''}
      />
      <BlankSpacer height={SPACE.spacing12} />
    </Box>
  );
};
