import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import Modal from "./Modal";

const LoadingSpinner: FC = () => {
  const exithandler: () => void = () => {};

  return (
    <>
      {createPortal(<Backdrop Exit={exithandler} />, backdropDiv)}
      {createPortal(<Modal Box={Box} Loader={CircularProgress} />, overlayDiv)}
    </>
  );
};

export default LoadingSpinner;
