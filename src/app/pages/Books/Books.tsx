import { BlankSpacer, BookItem, BPButton, BPTextField } from '@app/components';
import { SPACE, strings } from '@core';
import { FONT_SIZE } from '@core/const/font';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useStyles } from './Books.styles';
import { useViewModel } from './Books.ViewModel';
import SearchIcon from '@mui/icons-material/Search';

export const Books = (): JSX.Element => {
  const styles = useStyles();
  ///
  const { selector, handler } = useViewModel();
  const { file, filterState, books, getAllBooksLoading } = selector;
  const { setFilterState } = handler;

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
              { label: 'aaaaaaa', value: 'aaaaaaa' },
              { label: 'bbbbbbb', value: 'bbbbbbb' }
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
            options: [
              { label: 'aaaaaaa', value: 'aaaaaaa' },
              { label: 'bbbbbbb', value: 'bbbbbbb' }
            ]
          }}></BPTextField>
        <BlankSpacer height={SPACE.spacing16} />
        <BPButton title={strings.filter.toUpperCase()} onClick={() => {}}></BPButton>
      </Paper>
    );
  };
  const renderBookList = () => {
    return (
      <Box className={styles.bookListWrapper}>
        <Grid container columnSpacing={1} rowSpacing={SPACE.spacing4}>
          {books.map((book, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={4}
                key={(-index).toString() + 'bookItem'}>
                <BookItem bookData={book}></BookItem>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  if (getAllBooksLoading) {
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
    </Box>
  );
};
