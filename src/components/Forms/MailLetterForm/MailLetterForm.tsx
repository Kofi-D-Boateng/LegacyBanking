import { TextField, Button, Grid } from "@mui/material";
import {
  Dispatch,
  FC,
  FormEvent,
  MutableRefObject,
  SetStateAction,
  FocusEvent,
} from "react";

const Form: FC<{
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  show: boolean;
  emailRef: MutableRefObject<HTMLInputElement | undefined>;
  setShow: Dispatch<SetStateAction<boolean>>;
  submit: (e: FormEvent) => void;
}> = ({ classes, show, setShow, emailRef, submit }) => {
  const inputCheck: (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void = ({ currentTarget }) => {
    const { value } = currentTarget;
    if (
      (value.indexOf("@") && value.includes(".com")) ||
      value.includes(".net") ||
      value.includes(".global")
    ) {
      setShow(true);
    }
  };

  return (
    <form onSubmit={submit}>
      <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
        <TextField
          sx={{
            margin: "50px 0",
            width: "70%",
          }}
          InputProps={{
            className: classes.textfield,
          }}
          variant="filled"
          type="email"
          placeholder="enter email"
          inputRef={emailRef}
          size="small"
          fullWidth
          onBlur={inputCheck}
        />
      </Grid>
      <Grid sx={{ margin: "auto" }} xs={12} md={6} item>
        {show && (
          <Button
            variant="outlined"
            type="submit"
            sx={{
              margin: "auto",
              width: "70%",
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "#8a2be2",
                borderColor: "white",
              },
            }}
            fullWidth
          >
            Submit
          </Button>
        )}
      </Grid>
    </form>
  );
};

export default Form;
