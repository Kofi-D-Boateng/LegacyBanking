import { Button, Grid, TextField } from "@mui/material";
import { FC, useRef, useState, FormEvent, FocusEvent } from "react";
import { UserSignUp } from "../../../types/Signup";
import { specialCharacter, uppercase } from "../../UI/Regex/Pattern";

const SignupForm: FC<{
  classes: any;
  isValid: boolean;
  onGetUserInfo: (data: UserSignUp) => void;
}> = ({ classes, onGetUserInfo, isValid }) => {
  const firstNameRef = useRef<HTMLInputElement | undefined>();
  const lastNameRef = useRef<HTMLInputElement | undefined>();
  const emailRef = useRef<HTMLInputElement | undefined>();
  const dobRef = useRef<HTMLInputElement | undefined>();
  const countryRef = useRef<HTMLInputElement | undefined>();
  const stateRef = useRef<HTMLInputElement | undefined>();
  const zipcodeRef = useRef<HTMLInputElement | undefined>();
  const socialSecurityRef = useRef<HTMLInputElement | undefined>();
  const phoneNumberRef = useRef<HTMLInputElement | undefined>();
  const [password, setPassword] = useState<string>("");
  const [matches, setMatches] = useState<boolean>(true);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const info: UserSignUp = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      dob: dobRef.current?.value,
      country: countryRef.current?.value,
      state: stateRef.current?.value,
      zipCode: zipcodeRef.current?.value,
      socialSecurity: socialSecurityRef.current?.value,
      password: password,
      phoneNumber: phoneNumberRef.current?.value,
    };

    onGetUserInfo(info);
  };

  const passwordChecker = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value: string | undefined = event.target?.value;
    const isUppperCasePresent: boolean = uppercase.test(value.charAt(0));
    const isSpecialCharPresent: boolean = specialCharacter.test(value);
    if (value.length < 8 || !isUppperCasePresent || isSpecialCharPresent)
      return;
    setPassword(value);
  };

  const confirmPasswordChecker = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value: string | undefined = event.target?.value;
    if (password !== value) {
      setMatches(false);
      return;
    }
    setMatches(true);
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
            required
          />
          <p>Please enter legal first name</p>
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
            required
          />
          <p>Please enter legal last name</p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} md={6} item>
          <TextField
            variant="outlined"
            className={classes.inputField}
            type="date"
            size="small"
            placeholder="birthday"
            fullWidth
            inputRef={dobRef}
          />
          <p>Please enter your birthday</p>
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
            required
          />
          <p>Please enter a valid email</p>
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
            required
          />
          <p>Please enter your current country of residence</p>
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
            required
          />
          <p>Please enter your state or province</p>
        </Grid>
      </Grid>
      <Grid className={classes.inputField} container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            placeholder="zip code"
            inputRef={zipcodeRef}
            required
            inputProps={{
              maxLength: 5,
            }}
          />
          <p>Please enter your zipcode or provincial code</p>
        </Grid>
      </Grid>
      <Grid className={classes.inputField} container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            placeholder="social security"
            inputRef={socialSecurityRef}
            required
            inputProps={{
              maxLength: 9,
            }}
          />
          <p>
            Please enter your social security or govermental identification
            number. (THIS IS A FAKE WEBSITE!! DO NOT ENTER REAL NUMBER.)
          </p>
        </Grid>
      </Grid>
      <Grid className={classes.inputField} container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            type="tel"
            size="small"
            fullWidth
            placeholder="phone number"
            inputRef={phoneNumberRef}
            required
            inputProps={{
              maxLength: 10,
            }}
          />
          <p>Please enter your phone number with country code</p>
        </Grid>
      </Grid>
      <Grid className={classes.inputField} container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            placeholder="Password"
            onBlur={passwordChecker}
            required
            inputProps={{
              maxLength: 20,
            }}
          />
          <p>
            Please enter password of length 8-20 with at least 1 uppercase, 1
            number, and 1 special character
          </p>
        </Grid>
      </Grid>
      <Grid className={classes.inputField} container>
        <Grid xs={12} md={12} item>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            placeholder="Confirm Password"
            onBlur={confirmPasswordChecker}
            required
            inputProps={{
              maxLength: 20,
            }}
          />
          {!matches && <p>Password does not match</p>}
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
