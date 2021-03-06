import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1.5%',
    width: '95%',
    height: '50%',
    boxShadow: 'inset 0 0 0.1vw 0 grey',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    direction: 'rtl',
    padding: '0.5%',
    '&:last-child': {
      paddingBottom: '0.5%',
    },
  },
  text: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
    width: '100%',
  },
  role: {
    fontWeight: '500',
    fontSize: '0.8rem',
    paddingLeft: '1%',
    userSelect: 'none',
  },
}));

export default useStyles;
