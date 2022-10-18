import { alpha, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import type { EnhancedTableToolbarProps } from './Table.types';
import { ContainedButton } from '../buttons';
export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, tableHeader, setIsOpenDrawer, isOpenDrawer } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { sm: 2 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {tableHeader}
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <ContainedButton
            isShowLeftIcon={true}
            leftIcon={<AddIcon />}
            onClick={() => setIsOpenDrawer(true)}
            title={'Add'}></ContainedButton>
        )}
      </Box>
    </Toolbar>
  );
};
