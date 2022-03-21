import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState, useRef, useEffect, Fragment } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { NavLink, useNavigate } from "react-router-dom";
import japan from "../assets/photos/japan.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication/auth-slice";
import { customerActions } from "../store/customer/customer";

const styles = makeStyles(() => ({
  loginContainer: {
    width: "100%",
    height: "100vh",
  },
  cardTitle: {
    color: "purple",
    margin: "20px 30px",
    padding: "20px 0",
    textAlign: "justify",
  },
  inputField: {
    width: "70%",
    margin: "20px 30px",
  },
  btn: {
    width: "30%",
    margin: "20px 30px",
    borderColor: "green",
    color: "black",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      borderColor: "green",
    },
  },
  invalid: {
    color: "red",
    margin: "0 30px",
    transition: "0.5 ease in",
  },
  imgContainer: {
    background: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(${japan})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const Login: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  interface credentials {
    email: string | undefined;
    password: string | undefined;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState<boolean>(false);
  const [user, setUser] = useState<credentials>({
    email: "",
    password: "",
  });
  const emailRef = useRef<HTMLInputElement | undefined>();
  const passwordRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (user.email?.trim().length === 0 || user.password?.trim().length === 0) {
      return;
    }
    const fetchUserLogin = async (login: {}) => {
      await axios
        .post("http://localhost:8081/api/v1/authentication/login", login)
        .then((response) => {
          if (response.status === 200) {
            dispatch(authActions.getCreds({ token: response?.data.token }));
            dispatch(
              customerActions.createCustomer({
                fName: response.data.firstName,
                lName: response.data.lastName,
                email: response.data.email,
              })
            );
            navigate("/", { replace: true });
            setInvalid(false);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            setInvalid(true);
          }
        });
    };
    fetchUserLogin(user);
    console.log(user);
  }, [user, dispatch, navigate]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredValue: credentials = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    setUser(enteredValue);
  };
  const classes = styles();
  return (
    <Fragment>
      {isMobile ? (
        <Grid container>
          <Grid sx={{ margin: "auto" }} xs={6} md={6} item>
            <Typography className={classes.cardTitle} variant="h4">
              Please Login
            </Typography>
            {invalid && (
              <Grid className={classes.invalid}>
                <Typography variant="h6">Invalid email or password</Typography>
              </Grid>
            )}
            <form onSubmit={submitHandler}>
              <Grid container>
                <TextField
                  className={classes.inputField}
                  variant="outlined"
                  size="small"
                  type="email"
                  inputRef={emailRef}
                  placeholder="enter email"
                  fullWidth
                />
              </Grid>
              <Grid container>
                <TextField
                  className={classes.inputField}
                  variant="outlined"
                  size="small"
                  type="password"
                  inputRef={passwordRef}
                  placeholder="enter password"
                  fullWidth
                />
              </Grid>
              <Grid container>
                <Button
                  className={classes.btn}
                  variant="outlined"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </form>
            <Grid sx={{ margin: "10px 30px" }} container>
              <Grid xs={12} md={12} item>
                <NavLink to={"/forgot-password"} placeholder="test">
                  <Typography variant="body1">Forgot password</Typography>
                </NavLink>
              </Grid>
            </Grid>
            <NavLink
              style={{
                textDecoration: "none",
                margin: "0 30px",
                width: "50%",
              }}
              to={"/signup"}
            >
              <Typography
                sx={{ margin: "0 30px", fontSize: "1.2rem", color: "green" }}
                variant="body1"
              >
                Open an account
              </Typography>
            </NavLink>
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.loginContainer} container>
          <Grid sx={{ margin: "auto" }} xs={6} md={6} item>
            <Typography className={classes.cardTitle} variant="h4">
              Please Login
            </Typography>
            {invalid && (
              <Grid className={classes.invalid}>
                <Typography variant="h6">Invalid email or password</Typography>
              </Grid>
            )}
            <form onSubmit={submitHandler}>
              <Grid container>
                <TextField
                  className={classes.inputField}
                  variant="outlined"
                  size="small"
                  type="email"
                  inputRef={emailRef}
                  placeholder="enter email"
                  fullWidth
                />
              </Grid>
              <Grid container>
                <TextField
                  className={classes.inputField}
                  variant="outlined"
                  size="small"
                  type="password"
                  inputRef={passwordRef}
                  placeholder="enter password"
                  fullWidth
                />
              </Grid>
              <Grid container>
                <Button
                  className={classes.btn}
                  variant="outlined"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </form>
            <Grid sx={{ margin: "10px 30px" }} container>
              <Grid xs={12} md={12} item>
                <NavLink to={"/forgot-password"} placeholder="test">
                  <Typography variant="body1">Forgot password</Typography>
                </NavLink>
              </Grid>
            </Grid>
            <NavLink
              style={{
                textDecoration: "none",
                margin: "0 30px",
                width: "50%",
              }}
              to={"/signup"}
            >
              <Typography
                sx={{ margin: "0 30px", fontSize: "1.2rem", color: "green" }}
                variant="body1"
              >
                Open an account
              </Typography>
            </NavLink>
          </Grid>
          <Grid className={classes.imgContainer} xs={6} md={6} item />
        </Grid>
      )}
    </Fragment>
  );
};

export default Login;
