import { makeStyles } from '@material-ui/core/styles';
import config from '../../appConf';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollBar: {
    width: '90%',
    height: '10em',
    overflow: 'auto',
  },
  fieldsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  field: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.2%',
    fontFamily: config.style.fontFamily,
  },
  message: {
    fontFamily: config.style.fontFamily,
    color: config.style.primaryColor,
    fontWeight: '600',
    textAlign: 'center',
  },
}));

export default useStyles;
