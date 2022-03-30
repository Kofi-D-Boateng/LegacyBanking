import React, { useState, useRef, useEffect, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication/auth-slice";
import styles from "../styles/LoginStyles";

const Login: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  interface credentials {
    email: string | undefined;
    password: string | undefined;
  }
  const classes = styles();
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
    console.log(enteredValue);
    setUser(enteredValue);
  };
  return (
    <Fragment>
      {isMobile ? (
        <Grid className={classes.loginContainer} container>
          <Grid sx={{ margin: "auto" }} xs={6} md={6} item>
            <Typography
              sx={{
                color: "purple",
                margin: "20px 30px",
                padding: "20px 0",
                textAlign: "justify",
              }}
              variant="h4"
            >
              Please Login
            </Typography>
            {invalid && (
              <Grid className={classes.invalid}>
                <Typography variant="h6">Invalid email or password</Typography>
              </Grid>
            )}
            <LoginForm
              classes={classes}
              submit={submitHandler}
              password={passwordRef}
              email={emailRef}
            />
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
            <Typography
              sx={{
                color: "purple",
                margin: "20px 30px",
                padding: "20px 0",
                textAlign: "justify",
              }}
              variant="h4"
            >
              Please Login
            </Typography>
            {invalid && (
              <Grid className={classes.invalid}>
                <Typography variant="h6">Invalid email or password</Typography>
              </Grid>
            )}
            <LoginForm
              classes={classes}
              submit={submitHandler}
              password={passwordRef}
              email={emailRef}
            />
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
