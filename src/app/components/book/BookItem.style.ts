import { SPACE } from '@core';
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: SPACE.spacing8,
    height: 380
  }
});
