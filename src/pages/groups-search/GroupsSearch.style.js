import { makeStyles } from "@material-ui/core/styles";
import config from '../../appConf';

const useStyles = makeStyles(() => ({
  root: {
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
}));

export default useStyles;