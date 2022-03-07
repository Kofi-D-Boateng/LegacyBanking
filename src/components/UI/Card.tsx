import Card from "@mui/material/Card";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const styles = makeStyles(() => ({
  card: {
    border: "1px solid rgba(0,0,0,1)",
    borderRadius: "20px",
    margin: "50px auto",
    maxWidth: "70%",
    textAlign: "center",
  },
}));

const Kard: React.FC = ({ children }) => {
  const classes = styles();
  return <Card className={classes.card}>{children}</Card>;
};

export default Kard;
