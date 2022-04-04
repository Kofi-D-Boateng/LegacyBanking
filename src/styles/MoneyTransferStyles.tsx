import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles({
  card: {
    border: "0.5px solid purple",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "50%",
    zIndex: 5,
  },
  mobileCard: {
    border: "0.5px solid purple",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "80%",
    zIndex: 5,
  },
  btn: {
    margin: "auto",
    width: "100%",
    color: "green",
    borderColor: "green",
    "&:hover": {
      backgroundColor: "green",
      borderColor: "green",
      color: "white",
    },
  },
});

export default styles;
