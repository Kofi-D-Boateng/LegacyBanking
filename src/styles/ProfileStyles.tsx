import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles(() => ({
  profile: {
    backgroundColor: "rgb(235, 236, 237)",
    padding: "40px 0",
    width: "100%",
  },
  card: {
    width: "90%",
    margin: "20px auto",
    border: "0.5px solid black",
  },
  linksContainer: {
    borderRight: "1px solid purple",
    textAlign: "center",
    margin: "auto",
  },
  links: {
    color: "purple",
    textDecoration: "none",
    "&:hover": {
      color: "blue",
    },
  },
  details: {
    margin: "10px 0",
    textDecoration: "none",
    color: "black",
  },
  activityTitles: {
    textAlign: "center",
  },
  activities: {
    textAlign: "center",
  },
  paper: {
    margin: "30px auto",
    textAlign: "center",
    width: "70%",
    minHeight: "150px",
    position: "relative",
  },
}));

export default styles;
