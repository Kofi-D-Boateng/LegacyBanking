import {
  ButtonTypeMap,
  ExtendButtonBase,
  GridTypeMap,
  TextFieldProps,
  TypographyTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

const Form: React.FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  TextField: (props: TextFieldProps) => JSX.Element;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  submitHandler: (event: React.FormEvent) => void;
  amountHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  termsOfChoice: string;
  emailRef: React.MutableRefObject<HTMLInputElement | undefined>;
  phoneNumberRef: React.MutableRefObject<HTMLInputElement | undefined>;
}> = ({
  Button,
  Grid,
  TextField,
  Typography,
  emailRef,
  phoneNumberRef,
  submitHandler,
  termsOfChoice,
  amountHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <Grid sx={{ margin: "50px 0" }} container>
        <Grid sx={{ margin: "auto", textAlign: "center" }} xs={3} md={3} item>
          <Typography variant="h6">
            {termsOfChoice === "email" ? "Email: " : "Phone number: "}
          </Typography>
        </Grid>
        {termsOfChoice === "email" ? (
          <Grid xs={9} md={9} item>
            <TextField
              label="Email"
              size="small"
              type="email"
              inputRef={emailRef}
              placeholder="enter transfee's email"
              fullWidth
            />
          </Grid>
        ) : (
          <Grid xs={9} md={9} item>
            <TextField
              label="Phone Number"
              size="small"
              type="tel"
              inputRef={phoneNumberRef}
              placeholder="enter transfee's phone number"
              fullWidth
            />
          </Grid>
        )}
      </Grid>
      <Grid sx={{ margin: "50px 0" }} container>
        <Grid sx={{ margin: "auto", textAlign: "center" }} xs={3} md={3} item>
          <Typography variant="h6">Amount: </Typography>
        </Grid>
        <Grid xs={9} md={9} item>
          <TextField
            label="amount"
            size="small"
            placeholder="enter transfer amount"
            type="number"
            inputProps={{
              step: "0.01",
              lang: "en-US",
            }}
            onBlur={amountHandler}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container>
        <Button
          sx={{
            margin: "auto",
            width: "100%",
            color: "green",
            borderColor: "green",
            "&:hover": {
              backgroundColor: "green",
              borderColor: "green",
              color: "white",
            },
          }}
          variant="outlined"
          size="small"
          type="submit"
          fullWidth
        >
          Send
        </Button>
      </Grid>
    </form>
  );
};

export default Form;
