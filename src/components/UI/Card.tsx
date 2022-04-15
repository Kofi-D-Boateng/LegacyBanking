import { Card, ClassNameMap, makeStyles } from "@mui/material";
import React from "react";
import { GlobalLayouts } from "../../GlobalTypes/types";
const styles: () => ClassNameMap<string> = makeStyles(() => ({
  card: {
    border: "1px solid rgba(0,0,0,1)",
    borderRadius: "20px",
    margin: "50px auto",
    maxWidth: "70%",
    textAlign: "center",
  },
}));

const Kard: React.FC<GlobalLayouts> = ({ children }) => {
  const classes = styles();
  return <Card className={classes.card}>{children}</Card>;
};

export default Kard;
