import React from "react";
import { createPortal } from "react-dom";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  ClassNameMap,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "../Backdrops/Backdrop";
import { backdropDiv, overlayDiv } from "../Layouts/RootElement";
import styles from "../../../styles/MoneyTransferStyles";

const Modal: React.FC<{
  Exit: () => void;
  classes: ClassNameMap<string>;
  AN: string;
  RN: string;
  isMobile: boolean;
}> = ({ AN, Exit, RN, classes, isMobile }) => {
  const NUMBERS: { key: number; title: string; number: string }[] = [
    { key: 1, title: "Account Number", number: AN },
    { key: 2, title: "Routing Number", number: RN },
  ];
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
          Account Numbers
        </Typography>
        <IconButton
          onClick={Exit}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Grid>
      <CardContent>
        {NUMBERS.map((n) => {
          return (
            <Grid
              key={n.key}
              sx={{ textAlign: "center", margin: "auto" }}
              container
            >
              <Grid sx={{ margin: "auto" }} xs={3} md={6} item>
                <Typography variant="h6">{n.title}: </Typography>
              </Grid>
              <Grid sx={{ margin: "auto" }} xs={9} md={6} item>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                  {n.number}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </CardContent>
    </Card>
  );
};

const AccountNumbers: React.FC<{
  Exit: () => void;
  mobile: boolean;
  accountNum: string;
  routingNum: string;
}> = ({ Exit, mobile, accountNum, routingNum }) => {
  const classes = styles();
  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, backdropDiv)}
      {createPortal(
        <Modal
          AN={accountNum}
          RN={routingNum}
          isMobile={mobile}
          Exit={Exit}
          classes={classes}
        />,
        overlayDiv
      )}
    </>
  );
};

export default AccountNumbers;
