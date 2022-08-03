import { Close } from "@mui/icons-material";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { FC } from "react";
import { createPortal } from "react-dom";
import { NavigateFunction } from "react-router-dom";
import { MockStatementsTitles } from "../../../../assets/data/MockData";
import Backdrop from "../../Backdrops/Backdrop";
import Modal from "./Modal";

const Statement: FC<{
  Exit: () => void;
  nav: NavigateFunction;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  MockStatements: {
    key: number;
    date: string;
    amount: number;
    amountPaid: number;
  }[];
  BACKDROPDIV: HTMLElement | null;
  OVERLAYDIV: HTMLElement | null;
}> = ({ Exit, isMobile, classes, MockStatements, BACKDROPDIV, OVERLAYDIV }) => {
  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV as Element)}
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
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default Statement;
