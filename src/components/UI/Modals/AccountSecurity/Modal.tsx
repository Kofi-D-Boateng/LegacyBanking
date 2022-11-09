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
import {
  Dispatch,
  FC,
  Fragment,
  ReactElement,
  SetStateAction,
  MouseEvent,
} from "react";
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
  setChoice: Dispatch<
    SetStateAction<{
      choice: boolean;
      item: string;
    }>
  >;
  setView: Dispatch<SetStateAction<string>>;
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
  Lock,
  choice,
  setChoice,
  setView,
  view,
  isCardLocked,
}) => {
  const SECURITYOPTIONS: { key: number; title: string; svg: ReactElement }[] = [
    { key: 1, title: LOCKACCOUNT, svg: <Lock /> },
    { key: 2, title: LOCKCARD, svg: <CreditCard /> },
  ];
  const SECURITYVIEW: { key: number; title: string; view: JSX.Element }[] = [
    {
      key: 3,
      title: LOCKACCOUNT,
      view: (
        <AccountLock
          Grid={Grid}
          FormControl={FormControl}
          RadioGroup={RadioGroup}
          Radio={Radio}
          FormControlLabel={FormControlLabel}
          setChoice={setChoice}
          setView={setView}
        />
      ),
    },
    {
      key: 4,
      title: LOCKCARD,
      view: (
        <CardLock
          isCardLocked={isCardLocked}
          LOCKEDCARDMSG={LOCKEDCARDMSG}
          setView={setView}
          Grid={Grid}
          FormControl={FormControl}
          RadioGroup={RadioGroup}
          Radio={Radio}
          FormControlLabel={FormControlLabel}
          setChoice={setChoice}
        />
      ),
    },
  ];

  const viewHandler: (e: MouseEvent<HTMLButtonElement>) => void = ({
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
