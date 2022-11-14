import { Close } from "@mui/icons-material";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import { createPortal } from "react-dom";
import classes from "../../../../styles/Modals/Modals.module.css";
import {
  MockStatements,
  MockStatementsTitles,
} from "../../../../assets/data/MockData";
import Backdrop from "../../Backdrops/Backdrop";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import Modal from "./Modal";

const Statement: FC<{
  Exit: () => void;
  isMobile: boolean;
}> = ({ Exit, isMobile }) => {
  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, backdropDiv as Element)}
      {createPortal(
        <Modal
          classes={classes}
          Exit={Exit}
          isMobile={isMobile}
          MockStatements={MockStatements}
          Card={Card}
          Grid={Grid}
          Typography={Typography}
          IconButton={IconButton}
          CardContent={CardContent}
          Close={Close}
          MockStatementsTitles={MockStatementsTitles}
        />,
        overlayDiv as Element
      )}
    </>
  );
};

export default Statement;
