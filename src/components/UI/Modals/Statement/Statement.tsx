import { Close } from "@mui/icons-material";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";
import {
  MockStatements,
  MockStatementsTiles,
} from "../../../../assets/data/MockData";
import Backdrop from "../../Backdrops/Backdrop";

const Modal: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  Exit: () => void;
  isMobile: boolean;
  MockStatements: {
    key: number;
    date: string;
    amount: number;
    amountPaid: number;
  }[];
}> = ({ classes, Exit, isMobile }) => {
  return (
    <Card className={!isMobile ? classes.card : classes.mobileCard}>
      <Grid
        sx={{
          backgroundColor: "purple",
          padding: "20px 0",
        }}
        container
      >
        <Typography
          sx={{
            flexGrow: "1",
            margin: "auto",
            textAlign: "center",
            color: "white",
          }}
          variant="h6"
        >
          Account Statements
        </Typography>
        <IconButton
          onClick={Exit}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Close sx={{ color: "white" }} />
        </IconButton>
      </Grid>
      <CardContent>
        <>
          <Grid sx={{ textAlign: "center", padding: "20px 0" }} container>
            {MockStatementsTiles.map((T) => {
              return (
                <Grid
                  key={T.key}
                  xs={12 / MockStatementsTiles.length}
                  md={12 / MockStatementsTiles.length}
                  item
                >
                  <Typography variant="body1">{T.title}</Typography>
                </Grid>
              );
            })}
          </Grid>
          {MockStatements.map((S) => {
            return (
              <Grid key={S.key} sx={{ textAlign: "center" }} container>
                <Grid
                  sx={{ margin: "auto" }}
                  xs={12 / MockStatements.length}
                  md={12 / MockStatements.length}
                  item
                >
                  <Typography variant="body1">{S.date}</Typography>
                </Grid>
                <Grid
                  sx={{ margin: "auto" }}
                  xs={12 / MockStatements.length}
                  md={12 / MockStatements.length}
                  item
                >
                  <Typography variant="body1">${S.amount}</Typography>
                </Grid>
                <Grid
                  sx={{ margin: "auto" }}
                  xs={12 / MockStatements.length}
                  md={12 / MockStatements.length}
                  item
                >
                  <Typography variant="body1">${S.amountPaid}</Typography>
                </Grid>
                <div
                  style={{
                    borderBottom: "0.5px solid black",
                    width: "100%",
                  }}
                >
                  {" "}
                </div>
              </Grid>
            );
          })}
        </>
      </CardContent>
    </Card>
  );
};

const Statement: React.FC<{
  Exit: () => void;
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
        />,
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default Statement;
