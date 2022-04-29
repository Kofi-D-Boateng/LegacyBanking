import {
  ButtonTypeMap,
  CardTypeMap,
  ExtendButtonBase,
  GridTypeMap,
  TextFieldProps,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  useState,
  Dispatch,
  FC,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
} from "react";

const ContactForm: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  invalid: boolean;
  setLimit: Dispatch<React.SetStateAction<number>>;
  setView: Dispatch<React.SetStateAction<boolean>>;
  setInvalid: Dispatch<React.SetStateAction<boolean>>;
  Submit: (e: FormEvent<HTMLFormElement>) => void;
  TextField: (props: TextFieldProps) => JSX.Element;
  Card: OverridableComponent<CardTypeMap<{}, "div">>;
  CardContent: OverridableComponent<CardTypeMap<{}, "div">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  email: React.MutableRefObject<HTMLElement | undefined>;
  text: React.MutableRefObject<HTMLElement | undefined>;
  limit: number;
}> = ({
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  email,
  text,
  classes,
  isMobile,
  Submit,
  setView,
  setInvalid,
  invalid,
  limit,
  setLimit,
}) => {
  const [label, setLabel] = useState<boolean>(false);

  const sx: { margin: string } = {
    margin: "30px 0",
  };
  const invalidSx = {
    color: "red",
    borderColor: "red",
  };

  const emailCheck = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.currentTarget;
      if (
        !value.includes("@") ||
        !value.includes(".com") ||
        !value.includes(".net")
      ) {
        setInvalid(true);
        return;
      }
      setInvalid(false);
    },
    [setInvalid]
  );

  const labelHandler = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { type } = e;
      if (type === "focus") {
        setLabel(true);
        return;
      }
      if (type === "blur") {
        setLabel(false);
      }
    },
    [setLabel]
  );

  const limitHandler: (e: KeyboardEvent<HTMLDivElement>) => void = ({
    key,
    code,
  }) => {
    console.log(key);
    console.log(code);
    const regex = /[A-Za-z0-9]/;
    const spaceRegEx = /Space/;
    const regTest = regex.test(key);
    const spaceTest = spaceRegEx.test(code);
    setLabel(true);
    if (key === "Backspace" && limit !== 500) {
      setLimit(limit + 1);
      return;
    }
    if (regTest || spaceTest) {
      if (limit <= 500) {
        setLimit(limit - 1);
      }
      return;
    }
  };

  return (
    <>
      <Card className={!isMobile ? classes.card : classes.mobileCard}>
        <form onSubmit={Submit}>
          <CardContent>
            <Grid sx={sx} container>
              <TextField
                sx={!invalid ? invalidSx : null}
                inputRef={email}
                variant="outlined"
                type="email"
                fullWidth
                size="small"
                placeholder="Enter your email"
                onBlur={emailCheck}
              />
            </Grid>
            <Grid sx={sx} container>
              <TextField
                inputRef={text}
                variant="outlined"
                label={label && `${limit}/500`}
                type="text"
                multiline
                minRows={5}
                fullWidth
                placeholder="Enter your message"
                onKeyDown={limitHandler}
                onFocus={labelHandler}
                onBlur={labelHandler}
              />
            </Grid>
            <Grid sx={{ textAlign: "center" }} container>
              <Grid xs={6} md={6} item>
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "1.1rem",
                    width: "90%",
                    color: "green",
                    borderColor: "green",
                    "&:hover": {
                      color: "white",
                      borderColor: "green",
                      backgroundColor: "green",
                    },
                  }}
                  variant="outlined"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
              <Grid xs={6} md={6} item>
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "1.1rem",
                    width: "90%",
                    color: "red",
                    borderColor: "red",
                    "&:hover": {
                      color: "white",
                      borderColor: "red",
                      backgroundColor: "red",
                    },
                  }}
                  variant="outlined"
                  onClick={() => setView(false)}
                  fullWidth
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </>
  );
};

export default ContactForm;
