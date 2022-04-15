import React from "react";
import styles from "../../../styles/OverlayStyles";

const Backdrop: React.FC<{ Exit: () => void }> = ({ Exit }) => {
  const classes = styles();
  return <div onClick={Exit} className={classes.overlay} />;
};
export default Backdrop;
