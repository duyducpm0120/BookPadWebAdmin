import { Avatar, Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useStyles } from './User.style';
import { useViewModel } from './User.ViewModel';
import { Add, EditIcon, SPACE, SearchIcon, strings } from '@core';
import { BPButton, BPTable, BPTextField, BlankSpacer } from '@app/components';
import { FONT_SIZE } from '@core/const/font';
import { BookStatusType } from '../Books/Books.types';
import React, { useRef } from 'react';
import type { TableRefHandle } from '@app/components/table/Table.types';

export const UserPage: React.FC<any> = React.memo(() => {
  const styles = useStyles();
  const { selectors, handlers } = useViewModel();
  const { isLoading, userList, selectedUser } = selectors;
  const { setSelectedUser, banSelectedUser, unbanSelectedUser } = handlers;

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
                label: 'asdasdasdasdasdasd',
                value: 'asdasdasdasdasdasdasdasdasdasdasdasdas'
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

  const ViewAndEditAuthorUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <div
          style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Avatar
            alt={selectedUser.NickName}
            src={selectedUser.ProfilePicUrl}
            style={{
              width: 200,
              height: 200
            }}
          />
        </div>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Id'}
          autoFocus
          fullWidth
          value={selectedUser.UserId.toString()}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorId: e.target.value });
          }}
          type="text"
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Nick Name'}
          autoFocus
          fullWidth
          value={selectedUser.NickName}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorName: e.target.value });
          }}
          type="text"
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Email'}
          fullWidth
          value={selectedUser.Email}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDOB: e.target.value });
          }}
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Gender'}
          fullWidth
          value={selectedUser.Gender}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDOD: e.target.value });
          }}
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Phone'}
          fullWidth
          value={selectedUser.Phone}
          onChange={(e) => {
            // setAuthorData({ ...authorData, AuthorDOD: e.target.value });
          }}
          disabled
        />
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          label={'Is Admin'}
          fullWidth
          value={selectedUser.IsAdmin.toString()}
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
        tableData={userList}
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
          content: <ViewAndEditAuthorUI />,
          title: '',
          primaryButtonParams: {
            label: selectedUser.IsNotLocked ? 'Ban' : 'Unban',
            onClick: async () => {
              if (selectedUser.IsNotLocked) {
                await banSelectedUser();
              } else {
                await unbanSelectedUser();
              }
              tableRef.current?.closeViewAndEditDrawer();
            },
            isShow: true,
            type: 'outlined',
            leftIcon: <EditIcon />
            // disabled: !selectedUser.IsNotLocked
          },
          onClose: () => {
            // setIsEdit(false);
          }
        }}
        hideColumns={[
          'UserId',
          'IsAdmin',
          'IsActive',
          'IsNotLocked',
          'PrimaryLanguageId',
          'ProfilePicUrl'
        ]}
        showViewAndEditUICallBack={({ row }) => {
          setSelectedUser(userList[row]);
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
