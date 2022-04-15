import { ClassNameMap, makeStyles } from "@mui/material";

const styles: () => ClassNameMap<string> = makeStyles(() => ({
  footer: {
    backgroundColor: "lightgray",
    textAlign: "center",
    padding: "40px 0",
  },
  Logo: {
    color: "black",
  },
  footerLink: {
    padding: "10px 0",
    color: "black",
  },
}));

export default styles;
