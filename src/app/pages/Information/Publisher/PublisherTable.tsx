import React, { useState } from 'react';
import type { PublisherTableProps } from './PublisherTable.types';
import { BlankSpacer, BPButton, EnhancedTable } from '@app/components';
import { RADIUS, SPACE } from '@core';
import { Box, TextField, Typography } from '@mui/material';
import { useStyles } from './PublisherTable.styles';
import { FONT_SIZE } from '@core/const/font';
import AddIcon from '@mui/icons-material/Add';
import { safeGetString } from '@core/utils';
import { strings } from '@core/assets';
import { useViewModel } from './PublisherTable.viewModel';

export const PublisherTable: React.FC<PublisherTableProps> = (props: PublisherTableProps) => {
  const styles = useStyles();
  const {
    publisherData,
    CURRENT_PAGE_INDEX,
    CURRENT_PAGE,
    publisherName,
    setPublisherName,
    publisherDescription,
    setPublisherDescription,
    selectedPublisherIndex,
    setSelectedPublisherIndex,
    selectedPublisherNameRef,
    selectedPublisherDescriptionRef,
    updatePublisherData,
    createPublisher,
    newPublisherNameRef,
    newPublisherDescriptionRef,
    reloadPublisherData
  } = useViewModel(props);
  const AddNewPublisherUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <Typography variant="h4" fontSize={FONT_SIZE.fontSize24}>
          {strings.add_new_publisher}
        </Typography>
        <BlankSpacer height={SPACE.spacing12} />
        <TextField
          inputRef={newPublisherNameRef}
          margin="normal"
          required
          id="name"
          label="Publisher name"
          name="name"
          autoComplete="name"
          autoFocus
          color="primary"
          fullWidth
          value={publisherName}
          onChange={(e) => {
            setPublisherName(e.target.value);
          }}
          InputProps={{ style: { borderRadius: RADIUS.radius6 } }}
        />
        <TextField
          inputRef={newPublisherDescriptionRef}
          margin="normal"
          required
          id="description"
          label="Publisher description"
          name="description"
          autoComplete="description"
          autoFocus
          color="primary"
          fullWidth
          value={publisherDescription}
          onChange={(e) => {
            setPublisherDescription(e.target.value);
          }}
          InputProps={{ style: { borderRadius: RADIUS.radius6 } }}
          multiline
          rows={10}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <Box className={styles.buttonWrapper}>
          <BPButton
            isShowLeftIcon={true}
            leftIcon={<AddIcon />}
            title={'ADD'}
            onClick={async () => {
              await createPublisher();
            }}></BPButton>
        </Box>
      </Box>
    );
  };
  const ViewAndEditPublisherUI = () => {
    const [isEdit, setIsEdit] = useState(false);
    return (
      <Box className={styles.updatePublisherWrapper}>
        <Typography variant="h4" fontSize={FONT_SIZE.fontSize24}>
          {isEdit ? 'Edit publisher' : 'View publisher'}
        </Typography>
        <BlankSpacer height={SPACE.spacing12} />
        <TextField
          inputRef={selectedPublisherNameRef}
          margin="normal"
          required
          id="name"
          label="Publisher name"
          name="name"
          autoComplete="name"
          autoFocus
          color="primary"
          fullWidth
          // value={safeGetString(publisherData[selectedPublisherIndex], 'PublisherName', '')}
          onChange={(e) => {
            // setPublisherName(e.target.value);
          }}
          InputProps={{ style: { borderRadius: RADIUS.radius6 } }}
          disabled={!isEdit}
          defaultValue={safeGetString(publisherData[selectedPublisherIndex], 'PublisherName', '')}
        />
        <TextField
          inputRef={selectedPublisherDescriptionRef}
          margin="normal"
          required
          id="description"
          label="Publisher description"
          name="description"
          autoComplete="description"
          autoFocus
          color="primary"
          fullWidth
          // value={safeGetString(publisherData[selectedPublisherIndex], 'PublisherDescription', '')}
          onChange={(e) => {
            // setPublisherDescription(e.target.value);
          }}
          InputProps={{ style: { borderRadius: RADIUS.radius6 } }}
          multiline
          rows={10}
          disabled={!isEdit}
          defaultValue={safeGetString(
            publisherData[selectedPublisherIndex],
            'PublisherDescription',
            ''
          )}
        />
        <BlankSpacer height={SPACE.spacing12} />
        <Box className={styles.buttonWrapper}>
          {isEdit ? (
            <BPButton
              isShowLeftIcon={true}
              leftIcon={<></>}
              title={'Done'}
              onClick={async () => {
                await updatePublisherData();
                setIsEdit(false);
              }}></BPButton>
          ) : (
            <></>
          )}
          <BlankSpacer width={SPACE.spacing12} />
          <BPButton
            isShowLeftIcon={true}
            leftIcon={<></>}
            title={'Edit'}
            onClick={() => {
              setIsEdit(true);
            }}></BPButton>
        </Box>
      </Box>
    );
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <EnhancedTable
        tableHeader={CURRENT_PAGE.pages[CURRENT_PAGE_INDEX]}
        tableData={publisherData}
        rightDrawerAddNewUI={AddNewPublisherUI()}
        rightDrawerViewAndEditUI={ViewAndEditPublisherUI()}
        hideColumns={['PublisherDescription']}
        showViewAndEditUICallBack={({ row }) => {
          setSelectedPublisherIndex(row);
        }}
      />
    </div>
  );
};
