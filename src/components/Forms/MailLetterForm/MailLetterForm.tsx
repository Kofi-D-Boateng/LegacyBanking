import { TextField, Button, Grid } from "@mui/material";
import React from "react";

const Form: React.FC<{
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  show: boolean;
  emailRef: React.MutableRefObject<HTMLInputElement | undefined>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  submit: (e: React.FormEvent) => void;
}> = ({ classes, show, setShow, emailRef, submit }) => {
  const inputCheck: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
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
          color="primary"
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
                color: "purple",
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
