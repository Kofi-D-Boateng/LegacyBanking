import { FC } from "react";
import classes from "../../../styles/Overlay/OverlayStyles.module.css";

const Backdrop: FC<{ Exit: () => void }> = ({ Exit }) => {
  return <div onClick={Exit} className={classes.overlay} />;
};
export default Backdrop;
