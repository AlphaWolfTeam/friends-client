import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    minHeight: '100%',
  },
  tab: {
    fontWeight: 600,
  },
  page: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    overflow: 'auto',
    overflowX: 'hidden',
  },
  tabs: {
    marginBottom: '2%',
  },
}));

export default useStyles;
