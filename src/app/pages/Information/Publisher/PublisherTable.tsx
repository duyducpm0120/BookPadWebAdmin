import React, { useRef, useState } from 'react';
import type { PublisherTableProps } from './PublisherTable.types';
import { BlankSpacer, ContainedButton, EnhancedTable } from '@app/components';
import { RADIUS, SPACE, UpdatePublisher, useGlobalLoading, useGlobalState } from '@core';
import { Box, TextField, Typography } from '@mui/material';
import { useStyles } from './PublisherTable.styles';
import { FONT_SIZE } from '@core/const/font';
import AddIcon from '@mui/icons-material/Add';
import { safeGetString } from '@core/utils';
import { useGlobalAlert } from '@core/hooks/useGlobalAlert';
import { AlertType } from '@core/store';
import { strings } from '@core/assets';

export const PublisherTable: React.FC<PublisherTableProps> = (props: PublisherTableProps) => {
  const { publisherData } = props;
  const styles = useStyles();
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const [publisherName, setPublisherName] = React.useState('');
  const [publisherDescription, setPublisherDescription] = React.useState('');
  const [selectedPublisherIndex, setSelectedPublisherIndex] = React.useState(-1);
  const selectedPublisherNameRef = useRef(null);
  const selectedPublisherDescriptionRef = useRef(null);
  const { data, loading, error, updatePublisherFunc } = UpdatePublisher();
  const { showGlobalLoading, hideGlobalLoading } = useGlobalLoading();
  const { showAlert } = useGlobalAlert();
  const updatePublisherData = async () => {
    console.log('var', {
      publisherName: safeGetString(selectedPublisherNameRef.current, 'value', ''),
      publisherDescription: safeGetString(selectedPublisherDescriptionRef.current, 'value', ''),
      publisherId: publisherData[selectedPublisherIndex].PublisherId
    });
    showGlobalLoading();
    try {
      await updatePublisherFunc({
        variables: {
          publisherName: safeGetString(selectedPublisherNameRef.current, 'value', ''),
          publisherDescription: safeGetString(selectedPublisherDescriptionRef.current, 'value', ''),
          publisherId: publisherData[selectedPublisherIndex].PublisherId
        }
      });
      showAlert({
        message: strings.success_update_publisher,
        type: AlertType.SUCCESS
      });
    } catch (err) {
      const error: any = err;
      hideGlobalLoading();
      showAlert({
        message: error.message,
        type: AlertType.ERROR
      });
    }
    hideGlobalLoading();
  };
  const updatePublisherUI = () => {
    return (
      <Box className={styles.updatePublisherWrapper}>
        <Typography variant="h4" fontSize={FONT_SIZE.fontSize24}>
          Add new publisher
        </Typography>
        <BlankSpacer height={SPACE.spacing12} />
        <TextField
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
          <ContainedButton
            isShowLeftIcon={true}
            leftIcon={<AddIcon />}
            title={'ADD'}
            onClick={() => {}}></ContainedButton>
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
            <ContainedButton
              isShowLeftIcon={true}
              leftIcon={<></>}
              title={'Done'}
              onClick={async () => {
                await updatePublisherData();
                setIsEdit(false);
              }}></ContainedButton>
          ) : (
            <></>
          )}
          <BlankSpacer width={SPACE.spacing12} />
          <ContainedButton
            isShowLeftIcon={true}
            leftIcon={<></>}
            title={'Edit'}
            onClick={() => {
              setIsEdit(true);
            }}></ContainedButton>
        </Box>
      </Box>
    );
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <EnhancedTable
        tableHeader={CURRENT_PAGE.pages[CURRENT_PAGE_INDEX]}
        tableData={publisherData}
        rightDrawerAddNewUI={updatePublisherUI()}
        rightDrawerViewAndEditUI={ViewAndEditPublisherUI()}
        hideColumns={['PublisherDescription']}
        showViewAndEditUICallBack={({ row }) => {
          setSelectedPublisherIndex(row);
        }}
      />
    </div>
  );
};
