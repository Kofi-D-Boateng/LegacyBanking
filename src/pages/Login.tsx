import { FC, useState, useRef, useEffect, Fragment, FormEvent } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { customerActions } from "../store/customer/customer-slice";
import classes from "../styles/Login/LoginStyles.module.css";
import { LoginCredentials } from "../types/Credentials";
import LoginMobile from "../components/Login/LoginMobile";
import LoginWeb from "../components/Login/LoginWeb";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import { PROFILE } from "../components/UI/Constants/Constants";

const Login: FC<{
  isMobile: boolean;
  API_VERSION: string | undefined;
}> = ({ isMobile, API_VERSION }) => {
  const dispatch = useDispatch();
  const nav: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const emailRef = useRef<HTMLInputElement | undefined>();
  const passwordRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (
      credentials.email?.trim().length === 0 ||
      credentials.password?.trim().length === 0
    ) {
      return;
    }
    const fetchUserLogin = async (userCredentials: LoginCredentials) => {
      setLoading(true);
      await axios
        .post(`${API_VERSION}/authentication/login`, userCredentials)
        .then((response) => {
          if (response.status === 200) {
            const { token, isActivated, expiresIn } = response.data;
            dispatch(
              customerActions.getCreds({
                token: token,
                expiresIn: +expiresIn,
                isActivated: isActivated,
              })
            );
            nav(PROFILE.substring(0, 8), { replace: true });
          }
        })
        .catch(() => {
          setLoading(false);
          setInvalid(true);
        });
    };
    fetchUserLogin(credentials);
  }, [credentials, dispatch, nav, API_VERSION]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredValue: LoginCredentials = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    setCredentials(enteredValue);
  };
  return (
    <Fragment>
      {isMobile ? (
        <LoginMobile
          Box={Box}
          Loader={CircularProgress}
          loading={loading}
          isMobile={isMobile}
          invalid={invalid}
          Grid={Grid}
          classes={classes}
          Typography={Typography}
          NavLink={NavLink}
          submitHandler={submitHandler}
          PASSWORD={passwordRef}
          EMAIL={emailRef}
          LoginForm={LoginForm}
        />
      ) : (
        <LoginWeb
          Box={Box}
          Loader={CircularProgress}
          loading={loading}
          isMobile={isMobile}
          invalid={invalid}
          Grid={Grid}
          classes={classes}
          Typography={Typography}
          NavLink={NavLink}
          submitHandler={submitHandler}
          PASSWORD={passwordRef}
          EMAIL={emailRef}
          LoginForm={LoginForm}
        />
      )}
    </Fragment>
  );
};

export default Login;
