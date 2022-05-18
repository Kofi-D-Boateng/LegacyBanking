import { FC, useState, useRef, useEffect, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication/auth-slice";
import classes from "../styles/LoginStyles.module.css";
import { credentials } from "../Interfaces/Credentials";

const Login: FC<{ isMobile: boolean; URL: string | undefined }> = ({
  isMobile,
  URL,
}) => {
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
        .post(`${URL}/authentication/login`, login)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            const { token } = response.data;
            dispatch(authActions.getCreds({ token: token }));
            navigate("/profile", { replace: true });
          }
        })
        .catch(() => {
          console.log("HIT");
          setInvalid(true);
        });
    };
    fetchUserLogin(user);
  }, [user, dispatch, navigate, URL]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredValue: credentials = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
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
