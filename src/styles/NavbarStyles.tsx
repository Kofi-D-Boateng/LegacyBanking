import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles({
  navbar: {
    backgroundColor: "white",
    padding: "15px 0",
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
    fontSize: "1.2rem",
    textTransform: "none",
    textDecoration: "none",
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
