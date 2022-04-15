import { ClassNameMap, makeStyles } from "@mui/material";

const styles: () => ClassNameMap<string> = makeStyles(() => ({
  cardTitle: {
    backgroundColor: "lightgray",
    padding: "20px 0",
  },
  inputField: {
    margin: "20px auto",
    maxWidth: "80%",
  },
  btn: {
    margin: "8px 0",
    borderColor: "green",
    color: "black",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      borderColor: "green",
    },
  },
  invalid: {
    backgroundColor: "red",
    color: "white",
    padding: "20px 0",
    transition: "0.5 ease in",
  },
}));

export default styles;
