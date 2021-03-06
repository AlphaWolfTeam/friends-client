import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.snackbar + 1,
    color: '#fff',
  },
  backdrop: {
    background: 'none',
  },
}));

export default useStyles;
