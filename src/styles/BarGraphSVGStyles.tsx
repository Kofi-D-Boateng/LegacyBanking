import { ClassNameMap, makeStyles } from "@mui/material";

const styles: () => ClassNameMap<string> = makeStyles({
  svgHolder: {
    backgroundColor: "lightgray",
    width: "100%",
    padding: "40px 0",
    textAlign: "center",
  },
  card: {
    border: "0.3px solid black",
    margin: " 50px auto",
    width: "70%",
  },
});

export default styles;
