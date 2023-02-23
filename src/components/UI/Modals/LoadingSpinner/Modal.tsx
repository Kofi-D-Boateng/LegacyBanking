import { CircularProgressProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const Modal: FC<{
  Box: OverridableComponent<any>;
  Loader: (props: CircularProgressProps) => JSX.Element;
}> = ({ Box, Loader }) => {
  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", zIndex: "5" }}>
      <Loader />
    </Box>
  );
};

export default Modal;
