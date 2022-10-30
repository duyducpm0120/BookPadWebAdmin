import { BlankSpacer, BookItem, BPButton, BPDrawer, BPTextField } from '@app/components';
import { SPACE, strings, TEXT_COLOR } from '@core';
import { FONT_SIZE } from '@core/const/font';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useStyles } from './Books.styles';
import { useViewModel } from './Books.ViewModel';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useMemo } from 'react';
import { BookStatusType } from './Books.types';

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
    getAllAuthorsLoading
  } = selector;
  const { setFilterState, getAuthorsDisplayList, getFilteredData } = handler;

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
            onClick={() => {}}
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
  return (
    <Box className={styles.wrapper}>
      {renderFilterBox()}
      <BlankSpacer width={SPACE.spacing16} />
      {renderBookList()}
      <BPDrawer title="asdasd" open={false} onClose={() => {}}>
        <div>asdasd</div>
      </BPDrawer>
    </Box>
  );
};
