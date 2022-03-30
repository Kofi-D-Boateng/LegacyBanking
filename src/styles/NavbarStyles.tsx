import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles({
  navbar: {
    backgroundColor: "white",
  },
  logoDiv: {
    color: "#00bbff",
    flexGrow: 1,
  },
  navLink: {
    textDecoration: "none",
    textTransform: "none",
    margin: " 0 20px",
    color: "purple",
    "&:hover": {
      textDecoration: "underline",
      color: "black",
    },
    "&:active": {
      textDecoration: "underline",
      color: "black",
    },
  },
  menuLink: {
    textTransform: "none",
    textDecoration: "none",
    margin: " 0 20px",
    color: "purple",
    "&:hover": {
      textDecoration: "underline",
      color: "black",
    },
    "&:active": {
      textDecoration: "underline",
      color: "black",
    },
  },
});

export default styles;
