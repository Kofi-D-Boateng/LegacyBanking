import { FC } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "../../Backdrops/Backdrop";
import { NavigateFunction } from "react-router-dom";

const Modal: FC<{
  Exit: () => void;
  classes: {
    readonly [key: string]: string;
  };
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

const AccountNumbers: FC<{
  Exit: () => void;
  isMobile: boolean;
  nav: NavigateFunction;
  accountNum: string;
  routingNum: string;
  classes: {
    readonly [key: string]: string;
  };
  BACKDROPDIV: HTMLElement | null;
  OVERLAYDIV: HTMLElement | null;
}> = ({
  Exit,
  isMobile,
  accountNum,
  routingNum,
  classes,
  BACKDROPDIV,
  OVERLAYDIV,
}) => {
  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV as Element)}
      {createPortal(
        <Modal
          AN={accountNum}
          RN={routingNum}
          isMobile={isMobile}
          Exit={Exit}
          classes={classes}
        />,
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default AccountNumbers;
