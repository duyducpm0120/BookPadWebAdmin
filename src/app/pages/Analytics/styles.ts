import { SPACE } from '@core';
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: SPACE.spacing16
    // position: 'absolute'
  }
});
