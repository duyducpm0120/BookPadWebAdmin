import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useStyles } from './Rating.style';
import { useViewModel } from './Rating.ViewModel';
import { Add, EditIcon, SPACE, SearchIcon, strings } from '@core';
import { BPButton, BPTable, BPTextField, BlankSpacer } from '@app/components';
import { FONT_SIZE } from '@core/const/font';
import { BookStatusType } from '../Books/Books.types';
import React, { useRef } from 'react';
import type { TableRefHandle } from '@app/components/table/Table.types';

export const RatingPage: React.FC<any> = React.memo(() => {
  const styles = useStyles();
  const { selectors, handlers } = useViewModel();
  const { isLoading, ratingList, selectedRating } = selectors;
  const { setRatingList, setSelectedRating, hideReview, unhideReview } = handlers;

  const tableRef = useRef<TableRefHandle>(null);
  const renderFilterBox = () => {
    return (
      <Paper className={styles.filterWrapper}>
        <Typography fontWeight={'semibold'} fontSize={FONT_SIZE.fontSize24}>
          {strings.filter}
        </Typography>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.search}
          value={'asdasd'}
          onChange={(e) => {
            // setFilterState({ ...filterState, name: e.target.value });
          }}
          startIcon={<SearchIcon />}></BPTextField>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={strings.status}
          value={'asdasd'}
          onChange={(e) => {
            // setFilterState({ ...filterState, status: e.target.value });
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
          value={'asdasd'}
          onChange={(e) => {
            // setFilterState({ ...filterState, author: e.target.value });
          }}
          multiSelectParams={{
            options: [
              {
                label: 'asd',
                value: 'asd'
              }
            ]
          }}></BPTextField>
        <BlankSpacer height={SPACE.spacing16} />
        <BPButton
          label={strings.filter.toUpperCase()}
          onClick={() => {}}
          type="contained"></BPButton>
        <BlankSpacer height={SPACE.spacing16} />
        <div
          style={{
            width: '100%',
            backgroundColor: 'red'
          }}>
          <input
            type="file"
            // hidden
            onChange={() => {}}
            accept=".epub"
            style={{
              flex: 1,
              backgroundColor: 'red',
              position: 'absolute',
              zIndex: 1,
              width: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
            multiple
          />
        </div>
      </Paper>
    );
  };

  const ViewAndEditRatingUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <BPTextField
          label={'Review Id'}
          autoFocus
          fullWidth
          value={selectedRating.BookReviewId.toString()}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorId: e.target.value });
          }}
          type="text"
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Review Score'}
          autoFocus
          fullWidth
          value={selectedRating.BookReviewScore.toString()}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorName: e.target.value });
          }}
          type="text"
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Comment'}
          fullWidth
          value={selectedRating.BookReviewComment}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDOB: e.target.value });
          }}
          disabled
          multiline
          numberOfLines={10}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'CreatedAt'}
          fullWidth
          value={selectedRating.CreatedAt.toString()}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDOD: e.target.value });
          }}
          disabled
          type="datetime-local"
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'UpdatedAt'}
          fullWidth
          value={selectedRating.UpdatedAt.toString()}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDOD: e.target.value });
          }}
          disabled
          type="datetime-local"
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'OwnerId'}
          fullWidth
          value={selectedRating.OwnerId.toString()}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDescription: e.target.value });
          }}
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'BookId'}
          fullWidth
          value={selectedRating.BookId.toString()}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDescription: e.target.value });
          }}
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
      </Box>
    );
  };

  const renderUserList = () => {
    return (
      <BPTable
        ref={tableRef}
        tableHeader={''}
        tableData={ratingList}
        rightDrawerAddNewUIParams={{
          content: <div></div>,
          title: strings.add_new_author,
          primaryButtonParams: {
            label: strings.add,
            onClick: async () => {
              //   await createAuthor();
            },
            isShow: true,
            type: 'contained',
            leftIcon: <Add />
            // disabled: !isAddNewPublisherValid
          },
          onClose: () => {
            // setIsEdit(false);
          }
        }}
        rightDrawerViewAndEditUIParams={{
          content: <ViewAndEditRatingUI />,
          title: 'Review',
          primaryButtonParams: {
            label: selectedRating.IsHidden ? 'Unhide' : 'Hide',
            onClick: async () => {
              selectedRating.IsHidden ? await unhideReview() : await hideReview();
              tableRef.current?.closeViewAndEditDrawer();
            },
            isShow: true,
            type: 'outlined',
            leftIcon: <EditIcon />
            // disabled: !selectedRating.IsNotLocked
          },
          onClose: () => {
            // setIsEdit(false);
          }
        }}
        hideColumns={['IsDeleted', 'IsHidden', 'UpdatedAt', 'BookReviewId']}
        showViewAndEditUICallBack={({ row }) => {
          setSelectedRating(ratingList[row]);
        }}
        hideHeader
        hideCheckbox
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
  return (
    <Box className={styles.wrapper}>
      {/* {renderFilterBox()} */}
      <BlankSpacer width={SPACE.spacing16} />
      {renderUserList()}
    </Box>
  );
});
