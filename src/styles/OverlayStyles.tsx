import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles({
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    zIndex: "2",
    background: "rgba(0, 0, 0, 0.75)",
  },
});

export default styles;
