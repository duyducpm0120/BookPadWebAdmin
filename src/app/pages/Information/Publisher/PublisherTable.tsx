import React, { useState } from 'react';
import type { PublisherTableProps } from './PublisherTable.types';
import { BlankSpacer, BPButton, EnhancedTable } from '@app/components';
import { RADIUS, SPACE } from '@core';
import { Box, TextField } from '@mui/material';
import { useStyles } from './PublisherTable.styles';
import AddIcon from '@mui/icons-material/Add';
import { safeGetString } from '@core/utils';
import { strings } from '@core/assets';
import { useViewModel } from './PublisherTable.viewModel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
  const [isEdit, setIsEdit] = useState(false);
  const AddNewPublisherUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
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
            type="outlined"
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
    return (
      <Box className={styles.updatePublisherWrapper}>
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
              type="outlined"
              isShowLeftIcon={true}
              leftIcon={<SaveIcon />}
              title={'Save'}
              onClick={async () => {
                await updatePublisherData();
                setIsEdit(false);
              }}></BPButton>
          ) : (
            <></>
          )}
          <BlankSpacer width={SPACE.spacing12} />
          <BPButton
            type="outlined"
            isShowLeftIcon={true}
            leftIcon={<EditIcon />}
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
        rightDrawerAddNewUIParams={{
          content: AddNewPublisherUI(),
          title: strings.add_new_publisher
        }}
        rightDrawerViewAndEditUIParams={{
          content: ViewAndEditPublisherUI(),
          title: isEdit ? 'Edit publisher' : 'View publisher'
        }}
        hideColumns={['PublisherDescription']}
        showViewAndEditUICallBack={({ row }) => {
          setSelectedPublisherIndex(row);
        }}
      />
    </div>
  );
};
