import { Button, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";

const SignupForm: React.FC<{
  classes: any;
  onGetUserInfo: (data: {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    dob: string | undefined;
    country: string | undefined;
    state: string | undefined;
    zipcode: string | undefined;
    socialSecurity: string | undefined;
    password: string | undefined;
  }) => void;
}> = ({ classes, onGetUserInfo }) => {
  let firstNameRef = useRef<HTMLInputElement | undefined>();
  let lastNameRef = useRef<HTMLInputElement | undefined>();
  let emailRef = useRef<HTMLInputElement | undefined>();
  let dobRef = useRef<HTMLInputElement | undefined>();
  let countryRef = useRef<HTMLInputElement | undefined>();
  let stateRef = useRef<HTMLInputElement | undefined>();
  let zipcodeRef = useRef<HTMLInputElement | undefined>();
  let socialSecurityRef = useRef<HTMLInputElement | undefined>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    interface enteredValue {
      firstName: string | undefined;
      lastName: string | undefined;
      email: string | undefined;
      dob: string | undefined;
      country: string | undefined;
      state: string | undefined;
      zipcode: string | undefined;
      socialSecurity: string | undefined;
      password: string | undefined;
    }
    const info: enteredValue = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      dob: dobRef.current?.value,
      country: countryRef.current?.value,
      state: stateRef.current?.value,
      zipcode: zipcodeRef.current?.value,
      socialSecurity: socialSecurityRef.current?.value,
      password: password,
    };

    onGetUserInfo(info);
  };

  const passwordChecker = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string | undefined = event.target?.value;
    const regexUPPER = /^[A-Z]/;
    const specialCHAR = /[/!/@/#/$/%/^/&/*/()] /;
    const TO_UPPER_TEST: boolean = regexUPPER.test(value.charAt(0));
    console.log(TO_UPPER_TEST);
    const specialChar: boolean = specialCHAR.test(value);
    console.log(specialChar);
    if (value.length < 8 || !TO_UPPER_TEST) return;
    setPassword(value);
  };

  const confirmPasswordChecker = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string | undefined = event.target?.value;
    if (password !== value) {
      return;
    }
    setConfirmPassword(value);
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid container>
        <Grid xs={12} md={6} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="First name"
            inputRef={firstNameRef}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="Last name"
            inputRef={lastNameRef}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={6} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="date"
            size="small"
            fullWidth
            inputRef={dobRef}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="email"
            size="small"
            fullWidth
            placeholder="email"
            inputRef={emailRef}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={6} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="Country"
            inputRef={countryRef}
          />
        </Grid>
        <Grid xs={12} md={6} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="State/Province"
            inputRef={stateRef}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="zip code"
            inputRef={zipcodeRef}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="social security"
            inputRef={socialSecurityRef}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="Password"
            onChange={passwordChecker}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="text"
            size="small"
            fullWidth
            placeholder="Confirm Password"
            onChange={confirmPasswordChecker}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid sx={{ margin: "auto" }} xs={12} md={10} item>
          <Button
            className={classes.btn}
            variant="outlined"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
