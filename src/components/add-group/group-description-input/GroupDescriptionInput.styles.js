import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    resize: 'none',
    direction: 'rtl',
    borderRadius: 10,
    padding: '2%',
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamily,
    fontWeight: '700',
    position: 'relative',
    outline: 'none',
    border: '0.1vw solid grey',
    '&:focus, &:hover': {
      border: `0.1vw solid ${theme.palette.primary.main}`,
    },
  },
}));

export default useStyles;
