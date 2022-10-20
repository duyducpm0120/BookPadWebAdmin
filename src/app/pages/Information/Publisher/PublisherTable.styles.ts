import { COMMON_COLOR } from '../../../../core/const/colors';
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
  updatePublisherWrapper: {
    background: COMMON_COLOR.white,
    border: 0,
    padding: '16px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '25vw'
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  }
});
