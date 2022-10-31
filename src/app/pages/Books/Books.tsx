import { BlankSpacer, BookItem, BPButton, BPDrawer, BPTextField } from '@app/components';
import { SPACE, strings, TEXT_COLOR } from '@core';
import { FONT_SIZE } from '@core/const/font';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useStyles } from './Books.styles';
import { useViewModel } from './Books.ViewModel';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useMemo, useState } from 'react';
import { BookStatusType } from './Books.types';
import BookIcon from '@mui/icons-material/Book';

export const Books = (): JSX.Element => {
  const styles = useStyles();
  ///
  const { selector, handler } = useViewModel();
  const {
    file,
    filterState,
    getAllBooksLoading,
    getAllBooksData,
    getAllAuthorsData,
    getAllAuthorsLoading,
    metadata,
    coverUrl
  } = selector;
  const {
    setFilterState,
    getAuthorsDisplayList,
    getFilteredData,
    handleInputFileChange,
    handleSubmit,
    setMetadata,
    uploadBook
  } = handler;
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

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
              setIsOpenDrawer(true);
            }}
            label={'Add'}
            type="outlined"></BPButton>
        </Box>
        <BlankSpacer height={SPACE.spacing8} />
        <Grid container columnSpacing={1} rowSpacing={SPACE.spacing4}>
          {bookDataToRender.map((book, index) => {
            return (
              <Grid item sm={6} md={4} lg={4} xl={3} key={(-index).toString() + 'bookItem'}>
                <BookItem bookData={book}></BookItem>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  if (getAllBooksLoading || getAllAuthorsLoading) {
    return (
      <Box className={styles.loadingWrapper}>
        <BlankSpacer height={SPACE.spacing16} />
        <CircularProgress color="primary" />
      </Box>
    );
  }
  const addNewBookUI = () => {
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
            onChange={handleInputFileChange}
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
          />
          {coverUrl !== '' ? (
            <img
              style={{
                width: 'auto',
                height: 250
              }}
              src={coverUrl}></img>
          ) : (
            <BookIcon
              style={{
                width: 'auto',
                height: 250,
                resize: 'vertical'
              }}
              cursor="pointer"
              onClick={() => {}}>
              <input type="file" hidden onChange={handleInputFileChange} accept=".epub" />
            </BookIcon>
          )}
        </Box>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          //  ref={newPublisherNameRef}
          label={strings.title}
          autoFocus
          fullWidth
          value={metadata.title}
          onChange={(e) => {
            setMetadata({ ...metadata, title: e.target.value });
          }}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          //  ref={newPublisherNameRef}
          label={strings.author}
          autoFocus
          fullWidth
          value={metadata.creator}
          onChange={(e) => {
            setMetadata({ ...metadata, creator: e.target.value });
          }}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          //  ref={newPublisherNameRef}
          label={strings.publisher_name}
          autoFocus
          fullWidth
          value={metadata.publisher}
          onChange={(e) => {
            setMetadata({ ...metadata, publisher: e.target.value });
          }}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          // id="datetime-local"
          label={strings.publish_date}
          type="datetime-local"
          value={metadata.pubdate.toString()}
          // sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setMetadata({ ...metadata, pubdate: e.target.value });
          }}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          //  ref={newPublisherDescriptionRef}
          label={strings.publisher_description}
          fullWidth
          value={metadata.description}
          onChange={(e) => {
            setMetadata({ ...metadata, description: e.target.value });
            //  setPublisherDescription(e.target.value);
          }}
          multiline
          rows={10}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_description_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
      </Box>
    );
  };
  return (
    <Box className={styles.wrapper}>
      {renderFilterBox()}
      <BlankSpacer width={SPACE.spacing16} />
      {renderBookList()}
      <BPDrawer
        title={strings.add_new_book}
        open={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        primaryButtonParams={{
          label: strings.add,
          onClick: () => {
            const fn = async () => {
              await uploadBook();
              setIsOpenDrawer(false);
            };
            fn();
          },
          isShow: true,
          leftIcon: <AddIcon />,
          type: 'contained',
          disabled: metadata.title === ''
        }}>
        {addNewBookUI()}
      </BPDrawer>
    </Box>
  );
};
