import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";
import classes from "../../../../styles/Overlay/OverlayStyles.module.css";

const LoadingSpinner: FC = () => {
  const exithandler: () => void = () => {};

  return (
    <>
      <div onClick={exithandler} className={classes.overlay} />
      <Box sx={{ position: "absolute", top: "50%", left: "50%", zIndex: "5" }}>
        <CircularProgress />
      </Box>
    </>
  );
};

export default LoadingSpinner;
