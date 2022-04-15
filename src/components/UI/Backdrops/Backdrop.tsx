import React from "react";
import classes from "../../../styles/OverlayStyles.module.css";

const Backdrop: React.FC<{ Exit: () => void }> = ({ Exit }) => {
  return <div onClick={Exit} className={classes.overlay} />;
};
export default Backdrop;
