import { ClassNameMap, makeStyles } from "@mui/material";
import japan from "../assets/photos/japan.jpg";

const styles: () => ClassNameMap<string> = makeStyles(() => ({
  loginContainer: {
    width: "100%",
    height: "100vh",
  },
  cardTitle: {
    color: "purple",
    margin: "20px 30px",
    padding: "20px 0",
    textAlign: "justify",
  },
  inputField: {
    width: "70%",
    margin: "20px 30px",
  },
  btn: {
    width: "30%",
    margin: "20px 30px",
    borderColor: "green",
    color: "black",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      borderColor: "green",
    },
  },
  invalid: {
    color: "red",
    margin: "0 30px",
    transition: "0.5 ease in",
  },
  imgContainer: {
    background: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(${japan})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default styles;
