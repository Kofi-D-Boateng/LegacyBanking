import {
  CardContentTypeMap,
  CardTypeMap,
  ExtendButtonBase,
  FormControlLabelProps,
  FormControlTypeMap,
  GridTypeMap,
  IconButtonTypeMap,
  RadioGroupProps,
  RadioProps,
  SvgIconTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, ReactElement, MouseEvent, ChangeEvent } from "react";
import AccountLock from "./AccountLock";
import CardLock from "./CardLock";

const Modal: FC<{
  Card: OverridableComponent<CardTypeMap<{}, "div">>;
  CardContent: OverridableComponent<CardContentTypeMap<{}, "div">>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  IconButton: ExtendButtonBase<IconButtonTypeMap<{}, "button">>;
  Close: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  FormControl: OverridableComponent<FormControlTypeMap<{}, "div">>;
  FormControlLabel: (props: FormControlLabelProps) => JSX.Element;
  RadioGroup: (props: RadioGroupProps) => JSX.Element;
  Radio: (props: RadioProps) => JSX.Element;
  Lock: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  CreditCard: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  Exit: () => void;
  LOCKCARD: string;
  LOCKEDCARD: string;
  LOCKEDCARDMSG: string;
  LOCKACCOUNT: string;
  LOCKEDACCOUNT: string;
  LOCKEDACCOUNTMSG: string;
  isCardLocked: boolean;
  setAccountSecurityView: (e: MouseEvent<HTMLButtonElement>) => void;
  setLockedItem: (e: ChangeEvent<HTMLInputElement>) => void;
  securityView: string | null;
}> = ({
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Close,
  LOCKEDCARDMSG,
  classes,
  isMobile,
  Exit,
  LOCKACCOUNT,
  LOCKCARD,
  CreditCard,
  Lock,
  setAccountSecurityView,
  securityView,
  isCardLocked,
  setLockedItem,
}) => {
  const SECURITYOPTIONS: { key: number; title: string; svg: ReactElement }[] = [
    { key: 1, title: LOCKACCOUNT, svg: <Lock /> },
    { key: 2, title: LOCKCARD, svg: <CreditCard /> },
  ];

  return (
    <>
      <Card className={!isMobile ? classes.card : classes.mobileCard}>
        <Grid
          sx={{
            backgroundColor: "#8a2be2",
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
          {!securityView && (
            <Grid sx={{ textAlign: "center" }} container>
              {SECURITYOPTIONS.map((S) => {
                return (
                  <Grid key={S.key} xs={6} md={6} item>
                    <Typography variant="body1">{S.title}</Typography>
                    <IconButton
                      value={S.title}
                      children={S.svg}
                      onClick={setAccountSecurityView}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
          {securityView?.includes(LOCKACCOUNT) && (
            <AccountLock
              Grid={Grid}
              FormControl={FormControl}
              RadioGroup={RadioGroup}
              Radio={Radio}
              FormControlLabel={FormControlLabel}
              setLockedItem={setLockedItem}
            />
          )}
          {securityView?.includes(LOCKCARD) && (
            <CardLock
              isCardLocked={isCardLocked}
              LOCKEDCARDMSG={LOCKEDCARDMSG}
              setLockedItem={setLockedItem}
              Grid={Grid}
              FormControl={FormControl}
              RadioGroup={RadioGroup}
              Radio={Radio}
              FormControlLabel={FormControlLabel}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Modal;
