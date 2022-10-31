import { COMMON_COLOR } from '@core';
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
  wrapper: {
    background: COMMON_COLOR.white,
    border: 0,
    padding: '16px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '25vw',
    height: '100vh',
    boxSizing: 'border-box'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  },
  buttonsWrapper: {
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 0
  }
});
