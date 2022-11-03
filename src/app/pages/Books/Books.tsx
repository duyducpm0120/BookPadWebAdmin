import { BlankSpacer, BookItem, BPButton, BPDrawer, BPTextField, EmptyView } from '@app/components';
import { DeleteIcon, SPACE, strings, TEXT_COLOR } from '@core';
import { FONT_SIZE } from '@core/const/font';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useStyles } from './Books.styles';
import { useViewModel } from './Books.ViewModel';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useMemo, useState } from 'react';
import { BookStatusType } from './Books.types';
import { AddNewBookUI, ViewAndEditBookUI } from './items';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export const Books = (): JSX.Element => {
  const styles = useStyles();
  ///
  const { selector, handler } = useViewModel();
  const { filterState, getAllAuthorsData, bookData, isEditBookData, isLoading, isError } = selector;
  const {
    setFilterState,
    getAuthorsDisplayList,
    getFilteredData,
    handleInputFileChange,
    uploadBook,
    resetBookData,
    setBookData,
    checkIfAuthorExist,
    setIsEditBookData,
    editBook
  } = handler;
  const [isOpenAddNewDrawer, setIsOpenAddNewDrawer] = useState(false);
  const [isOpenViewAndEditDrawer, setIsOpenViewAndEditDrawer] = useState(false);

  const bookDataToRender = useMemo(() => {
    return getFilteredData();
  }, [getFilteredData]);

  const renderFilterBox = () => {
    return (
      <Paper className={styles.filterWrapper}>
        <Typography fontWeight={'semibold'} fontSize={FONT_SIZE.fontSize24}>
          {strings.filter}
        </Typography>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.search}
          value={filterState.name}
          onChange={(e) => {
            setFilterState({ ...filterState, name: e.target.value });
          }}
          startIcon={<SearchIcon />}></BPTextField>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.status}
          value={filterState.status}
          onChange={(e) => {
            setFilterState({ ...filterState, status: e.target.value });
          }}
          multiSelectParams={{
            options: [
              { label: 'Active', value: BookStatusType.active },
              { label: 'Inactive', value: BookStatusType.inactive }
            ]
          }}></BPTextField>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.author}
          value={filterState.author}
          onChange={(e) => {
            setFilterState({ ...filterState, author: e.target.value });
          }}
          multiSelectParams={{
            options: getAuthorsDisplayList()
          }}></BPTextField>
        <BlankSpacer height={SPACE.spacing16} />
        <BPButton
          label={strings.filter.toUpperCase()}
          onClick={() => {}}
          type="contained"></BPButton>
      </Paper>
    );
  };
  const renderBookList = () => {
    return (
      <Box className={styles.bookListWrapper}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
          <Typography
            fontWeight={'semibold'}
            fontSize={FONT_SIZE.fontSize24}
            color={TEXT_COLOR.primary}>
            {strings.books}
          </Typography>
          <BPButton
            leftIcon={<AddIcon />}
            onClick={() => {
              setIsOpenAddNewDrawer(true);
            }}
            label={'Add'}
            type="outlined"></BPButton>
        </Box>
        <BlankSpacer height={SPACE.spacing8} />
        <Grid container columnSpacing={1} rowSpacing={SPACE.spacing4}>
          {bookDataToRender.map((book, index) => {
            return (
              <Grid item sm={6} md={4} lg={4} xl={3} key={(-index).toString() + 'bookItem'}>
                <BookItem
                  bookData={book}
                  onClick={() => {
                    setIsOpenViewAndEditDrawer(true);
                    setBookData(book);
                  }}></BookItem>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  const addNewBookUI = () => {
    return (
      <AddNewBookUI
        getAllAuthorsData={getAllAuthorsData}
        bookData={bookData}
        handleInputFileChange={handleInputFileChange}
        setBookData={setBookData}
        getAuthorsDisplayList={getAuthorsDisplayList}
        checkIfAuthorExist={checkIfAuthorExist}
      />
    );
  };
  const viewAndEditBookUI = () => {
    return (
      <ViewAndEditBookUI
        getAllAuthorsData={getAllAuthorsData}
        bookData={bookData}
        handleInputFileChange={handleInputFileChange}
        setBookData={setBookData}
        getAuthorsDisplayList={getAuthorsDisplayList}
        checkIfAuthorExist={checkIfAuthorExist}
        isEditBookData={isEditBookData}
      />
    );
  };

  if (isLoading) {
    return (
      <Box className={styles.loadingWrapper}>
        <BlankSpacer height={SPACE.spacing16} />
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return <EmptyView />;
  }

  return (
    <Box className={styles.wrapper}>
      {renderFilterBox()}
      <BlankSpacer width={SPACE.spacing16} />
      {renderBookList()}
      <BPDrawer
        title={strings.add_new_book}
        open={isOpenAddNewDrawer}
        onClose={() => {
          setIsOpenAddNewDrawer(false);
          resetBookData();
        }}
        primaryButtonParams={{
          label: strings.add,
          onClick: () => {
            const fn = async () => {
              await uploadBook();
              setIsOpenAddNewDrawer(false);
            };
            fn();
          },
          isShow: true,
          leftIcon: <AddIcon />,
          type: 'contained',
          disabled: bookData.BookCoverImage === ''
        }}>
        {addNewBookUI()}
      </BPDrawer>
      <BPDrawer
        title={strings.view_and_edit_book}
        open={isOpenViewAndEditDrawer}
        onClose={() => {
          setIsOpenViewAndEditDrawer(false);
          setIsEditBookData(false);
          resetBookData();
        }}
        primaryButtonParams={{
          label: isEditBookData ? strings.save : strings.edit,
          onClick: () => {
            if (!isEditBookData) setIsEditBookData(true);
            else {
              //   // await uploadBook();
              editBook();
              resetBookData();
              setIsEditBookData(false);
              setIsOpenViewAndEditDrawer(false);
            }
          },
          isShow: true,
          type: 'contained',
          leftIcon: isEditBookData ? <SaveIcon /> : <EditIcon />,
          disabled: bookData.BookName === '' || bookData.BookPublisher.PublisherName === ''
        }}
        secondaryButtonParams={{
          label: strings.delete,
          onClick: async () => {
            // await deleteBook();
            resetBookData();
            setIsOpenViewAndEditDrawer(false);
          },
          isShow: true,
          type: 'outlined',
          leftIcon: <DeleteIcon />
        }}>
        {viewAndEditBookUI()}
      </BPDrawer>
    </Box>
  );
};
