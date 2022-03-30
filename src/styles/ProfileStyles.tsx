import makeStyles from "@mui/styles/makeStyles";

const styles = makeStyles(() => ({
  profile: {
    backgroundColor: "rgb(235, 236, 237)",
    padding: "10px 0",
    width: "100%",
  },
  card: {
    width: "90%",
    margin: "20px auto",
  },
  linksContainer: {
    borderRight: "1px solid purple",
    textAlign: "center",
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
}));

export default styles;
