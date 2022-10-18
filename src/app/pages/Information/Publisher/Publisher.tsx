import React from 'react';
import type { PublisherPageProps } from './Publisher.types';
import { BlankSpacer, ContainedButton, EnhancedTable } from '@app/components';
import { RADIUS, SPACE, useGlobalState } from '@core';
import { Box, TextField, Typography } from '@mui/material';
import { useStyles } from './Publisher.styles';
import { FONT_SIZE } from '@core/const/font';
import AddIcon from '@mui/icons-material/Add';

export const Publisher: React.FC<PublisherPageProps> = (props: PublisherPageProps) => {
  const { publisherData } = props;
  const styles = useStyles();
  const { CURRENT_PAGE_INDEX, CURRENT_PAGE } = useGlobalState();
  const [publisherName, setPublisherName] = React.useState('');
  const [publisherDescription, setPublisherDescription] = React.useState('');
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
  return (
    <div style={{ height: 400, width: '100%' }}>
      <EnhancedTable
        tableHeader={CURRENT_PAGE.pages[CURRENT_PAGE_INDEX]}
        tableData={publisherData}
        rightDrawerContent={updatePublisherUI()}
      />
    </div>
  );
};
