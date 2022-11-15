import { Button, CardContent, Grid, TextField } from "@mui/material";
import {
  useState,
  Dispatch,
  FC,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  MutableRefObject,
} from "react";

const ContactForm: FC<{
  classes: {
    readonly [key: string]: string;
  };
  setLimit: Dispatch<React.SetStateAction<number>>;
  Submit: (e: FormEvent<HTMLFormElement>) => void;
  email: MutableRefObject<HTMLElement | undefined>;
  text: MutableRefObject<HTMLElement | undefined>;
  topic: MutableRefObject<HTMLElement | undefined>;
  limit: number;
}> = ({ email, text, classes, Submit, limit, setLimit, topic }) => {
  const [label, setLabel] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

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
        setIsValid(true);
        return;
      }
      setIsValid(false);
    },
    [setIsValid]
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
    const regex = /[A-Za-z0-9]/;
    const spaceRegEx = /Space/;
    const regTest = regex.test(key);
    const spaceTest = spaceRegEx.test(code);
    setLabel(true);
    if (key === "Backspace" && limit !== 500) {
      setLimit(limit + 1);
      return;
    }
    if ((regTest || spaceTest) && key !== "Backspace") {
      if (limit <= 500) {
        setLimit(limit - 1);
      }
      return;
    }
  };

  return (
    <form onSubmit={Submit}>
      <CardContent>
        <Grid sx={sx} container>
          <TextField
            sx={!isValid ? invalidSx : null}
            inputProps={{
              maxLength: 50,
            }}
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
            inputProps={{
              maxLength: 40,
            }}
            inputRef={topic}
            variant="outlined"
            type="text"
            fullWidth
            size="small"
            placeholder="Enter Topic"
            onBlur={emailCheck}
          />
        </Grid>
        <Grid sx={sx} container>
          <TextField
            inputRef={text}
            inputProps={{
              maxLength: 500,
            }}
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
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              fontSize: "1.1rem",
              width: "100%",
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
      </CardContent>
    </form>
  );
};

export default ContactForm;
