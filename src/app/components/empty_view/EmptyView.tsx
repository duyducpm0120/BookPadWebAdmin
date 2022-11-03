import { SearchIcon, SPACE, TEXT_COLOR } from '@core';
import { Box, Typography } from '@mui/material';
import { BlankSpacer } from '../BlankSpacer';

export const EmptyView = (): JSX.Element => {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <SearchIcon
        style={{
          width: '100px',
          height: '100px',
          color: TEXT_COLOR.primary
        }}></SearchIcon>
      <BlankSpacer height={SPACE.spacing16} />
      <Typography variant="h5" color={TEXT_COLOR.primary}>
        Empty data
      </Typography>
    </Box>
  );
};
