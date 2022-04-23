import {
  CardContentTypeMap,
  CardTypeMap,
  ExtendButtonBase,
  FormControlLabelProps,
  FormControlTypeMap,
  GridTypeMap,
  IconButtonTypeMap,
  MenuItemTypeMap,
  RadioGroupProps,
  RadioProps,
  SvgIconTypeMap,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, Fragment, ReactElement, SetStateAction } from "react";
import AccountLock from "./AccountLock";
import CardLock from "./CardLock";

const Modal: React.FC<{
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
  MenuItem: ExtendButtonBase<MenuItemTypeMap<{}, "li">>;
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
  setChoice: Dispatch<
    SetStateAction<{
      choice: boolean;
      item: string;
    }>
  >;
  setView: Dispatch<React.SetStateAction<string>>;
  view: string;
  choice: {
    choice: boolean;
    item: string;
  };
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
  LOCKEDACCOUNTMSG,
  LOCKEDCARDMSG,
  classes,
  isMobile,
  Exit,
  LOCKEDACCOUNT,
  LOCKEDCARD,
  LOCKACCOUNT,
  LOCKCARD,
  CreditCard,
  MenuItem,
  Lock,
  choice,
  setChoice,
  setView,
  view,
}) => {
  const SECURITYOPTIONS: { key: number; title: string; svg: ReactElement }[] = [
    { key: 1, title: LOCKACCOUNT, svg: <Lock /> },
    { key: 2, title: LOCKCARD, svg: <CreditCard /> },
  ];
  const SECURITYVIEW: { key: number; title: string; view: JSX.Element }[] = [
    {
      key: 1,
      title: LOCKACCOUNT,
      view: (
        <AccountLock
          Grid={Grid}
          FormControl={FormControl}
          RadioGroup={RadioGroup}
          Radio={Radio}
          MenuItem={MenuItem}
          FormControlLabel={FormControlLabel}
          setChoice={setChoice}
          setView={setView}
        />
      ),
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
  console.log(choice.choice);

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
            {choice.choice
              ? choice.item.includes(LOCKEDCARD)
                ? LOCKEDCARDMSG
                : choice.item.includes(LOCKEDACCOUNT)
                ? LOCKEDACCOUNTMSG
                : choice.item
              : undefined}
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
                      {!choice.choice && (
                        <Grid key={S.key} xs={6} md={6} item>
                          <Typography variant="body1">{S.title}</Typography>
                          <IconButton
                            value={S.title}
                            children={S.svg}
                            onClick={viewHandler}
                          />
                        </Grid>
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

export default Modal;
