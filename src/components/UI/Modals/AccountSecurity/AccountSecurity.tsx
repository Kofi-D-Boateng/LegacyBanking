import { Close, Lock, CreditCard } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import React, { Fragment, ReactElement, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import {
  LOCKACCOUNT,
  LOCKCARD,
  LOCKEDACCOUNTMSG,
  LOCKEDCARD,
  LOCKEDCARDMSG,
} from "../../Constants/Constants";
import AccountLock from "./AccountLock";
import CardLock from "./CardLock";

const Modal: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  Exit: () => void;
}> = ({ classes, isMobile, Exit }) => {
  const [view, setView] = useState<string>("");
  const [choice, setChoice] = useState<{ choice: boolean; item: string }>({
    choice: false,
    item: "",
  });
  console.log(choice.item);
  const SECURITYOPTIONS: { key: number; title: string; svg: ReactElement }[] = [
    { key: 1, title: LOCKACCOUNT, svg: <Lock /> },
    { key: 2, title: LOCKCARD, svg: <CreditCard /> },
  ];
  const SECURITYVIEW: { key: number; title: string; view: JSX.Element }[] = [
    {
      key: 1,
      title: LOCKACCOUNT,
      view: <AccountLock setView={setView} Grid={Grid} />,
    },
    {
      key: 2,
      title: LOCKCARD,
      view: (
        <CardLock
          setView={setView}
          Grid={Grid}
          FormControl={FormControl}
          RadioGroup={RadioGroup}
          Radio={Radio}
          MenuItem={MenuItem}
          FormControlLabel={FormControlLabel}
          setChoice={setChoice}
        />
      ),
    },
  ];

  const viewHandler: (e: React.MouseEvent<HTMLButtonElement>) => void = ({
    currentTarget,
  }) => {
    const { value } = currentTarget;
    setView(value);
  };

  return (
    <>
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
            Account Security
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
          <Grid sx={{ textAlign: "center" }} container>
            {view.trim() ? (
              <>
                {SECURITYVIEW.filter((S) => {
                  return S.title.includes(view);
                }).map((S) => {
                  return <Fragment key={S.key}>{S.view}</Fragment>;
                })}
              </>
            ) : (
              <>
                {SECURITYOPTIONS.map((S) => {
                  return (
                    <>
                      {!choice.choice ? (
                        <Grid key={S.key} xs={6} md={6} item>
                          <Typography variant="body1">{S.title}</Typography>
                          <IconButton
                            value={S.title}
                            children={S.svg}
                            onClick={viewHandler}
                          />
                        </Grid>
                      ) : choice.item.includes(LOCKEDCARD) ? (
                        LOCKEDCARDMSG
                      ) : (
                        LOCKEDACCOUNTMSG
                      )}
                    </>
                  );
                })}
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

const AccountSecurity: React.FC<{
  Exit: () => void;
  BACKDROPDIV: HTMLElement;
  OVERLAYDIV: HTMLElement;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
}> = ({ Exit, BACKDROPDIV, OVERLAYDIV, classes, isMobile }) => {
  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV)}
      {createPortal(
        <Modal Exit={Exit} classes={classes} isMobile={isMobile} />,
        OVERLAYDIV
      )}
    </>
  );
};

export default AccountSecurity;
