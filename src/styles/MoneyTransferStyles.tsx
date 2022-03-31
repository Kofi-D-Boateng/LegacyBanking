import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles({
  card: {
    border: "1.5px solid black",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "50%",
    zIndex: 5,
  },
  btn: {
    margin: "auto",
    width: "70%",
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
