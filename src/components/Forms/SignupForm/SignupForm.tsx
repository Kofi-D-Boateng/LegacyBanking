import { Button, Grid, TextField } from "@mui/material";
import { ChangeEvent, FC, useRef, useState, FormEvent } from "react";

const SignupForm: FC<{
  classes: any;
  isValid: boolean;
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
    phoneNumber: string | undefined;
  }) => void;
}> = ({ classes, onGetUserInfo, isValid }) => {
  let firstNameRef = useRef<HTMLInputElement | undefined>();
  let lastNameRef = useRef<HTMLInputElement | undefined>();
  let emailRef = useRef<HTMLInputElement | undefined>();
  let dobRef = useRef<HTMLInputElement | undefined>();
  let countryRef = useRef<HTMLInputElement | undefined>();
  let stateRef = useRef<HTMLInputElement | undefined>();
  let zipcodeRef = useRef<HTMLInputElement | undefined>();
  let socialSecurityRef = useRef<HTMLInputElement | undefined>();
  let phoneNumberRef = useRef<HTMLInputElement | undefined>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<boolean>(true);

  const submitHandler = (event: FormEvent) => {
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
      phoneNumber: string | undefined;
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
      phoneNumber: phoneNumberRef.current?.value,
    };

    onGetUserInfo(info);
  };

  const passwordChecker = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string | undefined = event.target?.value;
    const regexUPPER = /^[A-Z]/;
    const specialCHAR = /[/!/@/#/$/%/^/&/*/()] /;
    const isUppperCasePresent: boolean = regexUPPER.test(value.charAt(0));
    const isSpecialCharPresent: boolean = specialCHAR.test(value);
    if (value.length < 8 || !isUppperCasePresent || isSpecialCharPresent)
      return;
    setPassword(value);
  };

  const confirmPasswordChecker = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string | undefined = event.target?.value;
    if (password !== value) {
      setConfirmPassword(false);
      return;
    }
    setConfirmPassword(true);
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
            type="email"
            size="small"
            fullWidth
            placeholder="email"
            inputRef={emailRef}
            InputProps={{
              className: isValid ? classes.inputField : classes.invalid,
            }}
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
            inputProps={{
              maxLength: 5,
            }}
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
            inputProps={{
              maxLength: 9,
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="tel"
            size="small"
            fullWidth
            placeholder="phone number"
            inputRef={phoneNumberRef}
            inputProps={{
              maxLength: 10,
            }}
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
            inputProps={{
              maxLength: 20,
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            sx={{ color: "red" }}
            className={confirmPassword ? classes.inputField : classes.invalid}
            type="text"
            size="small"
            fullWidth
            placeholder="Confirm Password"
            onChange={confirmPasswordChecker}
            inputProps={{
              maxLength: 20,
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid sx={{ margin: "auto" }} xs={12} md={11} item>
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
