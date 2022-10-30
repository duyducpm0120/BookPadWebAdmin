import React, { useState } from 'react';
import type { PublisherTableProps } from './PublisherTable.types';
import { BlankSpacer, BPTextField, EnhancedTable } from '@app/components';
import { SPACE } from '@core';
import { Box } from '@mui/material';
import { useStyles } from './PublisherTable.styles';
import { safeGetString } from '@core/utils';
import { strings } from '@core/assets';
import { useViewModel } from './PublisherTable.viewModel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Add from '@mui/icons-material/Add';

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
    reloadPublisherData,
    isAddNewPublisherValid
  } = useViewModel(props);
  const [isEdit, setIsEdit] = useState(false);
  const AddNewPublisherUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          ref={newPublisherNameRef}
          label={strings.publisher_name}
          autoFocus
          fullWidth
          value={publisherName}
          onChange={(e) => {
            setPublisherName(e.target.value);
          }}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing8} />
        <BPTextField
          ref={newPublisherDescriptionRef}
          label={strings.publisher_description}
          fullWidth
          value={publisherDescription}
          onChange={(e) => {
            setPublisherDescription(e.target.value);
          }}
          multiline
          rows={10}
          // error={!isAddNewPublisherValid}
          // errorText={!isAddNewPublisherValid ? strings.publisher_description_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
        {/* <Box className={styles.buttonWrapper}>
          <BPButton
            type="outlined"
            isShowLeftIcon={true}
            leftIcon={<AddIcon />}
            label={'ADD'}
            onClick={async () => {
              await createPublisher();
            }}></BPButton>
        </Box> */}
      </Box>
    );
  };
  const ViewAndEditPublisherUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <BlankSpacer height={SPACE.spacing12} />
        <BPTextField
          ref={selectedPublisherNameRef}
          label="Publisher name"
          autoFocus
          fullWidth
          // value={safeGetString(publisherData[selectedPublisherIndex], 'PublisherName', '')}
          onChange={(e) => {
            // setPublisherName(e.target.value);
          }}
          disabled={!isEdit}
          defaultValue={safeGetString(publisherData[selectedPublisherIndex], 'PublisherName', '')}
          // error={!isUpdatePublisherValid()}
          // errorText={!isUpdatePublisherValid() ? strings.publisher_name_required : ''}
        />
        <BlankSpacer height={SPACE.spacing8} />
        <BPTextField
          ref={selectedPublisherDescriptionRef}
          label="Publisher description"
          autoFocus
          fullWidth
          // value={safeGetString(publisherData[selectedPublisherIndex], 'PublisherDescription', '')}
          onChange={(e) => {
            // setPublisherDescription(e.target.value);
          }}
          multiline
          rows={10}
          disabled={!isEdit}
          defaultValue={safeGetString(
            publisherData[selectedPublisherIndex],
            'PublisherDescription',
            ''
          )}
          // error={!isUpdatePublisherValid()}
          // errorText={!isUpdatePublisherValid() ? strings.publisher_description_required : ''}
        />
        <BlankSpacer height={SPACE.spacing12} />
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
          title: strings.add_new_publisher,
          primaryButtonParams: {
            label: strings.add,
            onClick: async () => {
              await createPublisher();
            },
            isShow: true,
            type: 'contained',
            leftIcon: <Add />
            // disabled: !isAddNewPublisherValid
          }
        }}
        rightDrawerViewAndEditUIParams={{
          content: ViewAndEditPublisherUI(),
          title: isEdit ? 'Edit publisher' : 'View publisher',
          secondaryButtonParams: {
            label: strings.save,
            onClick: async () => {
              if (!isEdit) return;
              await updatePublisherData();
              setIsEdit(false);
            },
            isShow: true,
            type: 'outlined',
            leftIcon: <SaveIcon />,
            disabled: !isEdit
          },
          primaryButtonParams: {
            label: strings.edit,
            onClick: () => {
              setIsEdit(true);
            },
            isShow: true,
            type: 'contained',
            leftIcon: <EditIcon />
          }
        }}
        hideColumns={['PublisherDescription']}
        showViewAndEditUICallBack={({ row }) => {
          setSelectedPublisherIndex(row);
        }}
      />
    </div>
  );
};
