import { COMMON_COLOR, SPACE, RADIUS } from '@core';
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: SPACE.spacing16
  },
  filterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: COMMON_COLOR.white,
    padding: SPACE.spacing16
  },
  bookListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
    backgroundColor: COMMON_COLOR.white,
    padding: SPACE.spacing16,
    height: '100%',
    borderRadius: RADIUS.radius4
  },
  bookItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COMMON_COLOR.white,
    padding: SPACE.spacing16,
    width: 550
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: SPACE.spacing16
  },
  addNewBookWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    marginTop: SPACE.spacing16
  }
});
