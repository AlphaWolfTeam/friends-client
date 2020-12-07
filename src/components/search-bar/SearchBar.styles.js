import { makeStyles } from "@material-ui/core/styles";
import config from "../../appConf";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: config.style.mainColor,
    marginTop: "2%",
    width: "30%",
  },
  searchIcon: {
    color: "white",
    marginLeft: "1%",
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    fontSize: '1vw',
    color: "white",
    fontFamily: config.style.fontFamily,
    fontWeight: "500",
  },
}));

export default useStyles;
