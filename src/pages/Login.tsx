import { FC, useState, useRef, useEffect, Fragment, FormEvent } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import {
  NavigateFunction,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { customerActions } from "../store/customer/customer-slice";
import classes from "../styles/Login/LoginStyles.module.css";
import { LoginCredentials } from "../types/Credentials";
import LoginMobile from "../components/Login/LoginMobile";
import LoginWeb from "../components/Login/LoginWeb";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import { API_VERSION } from "../components/UI/Constants/Constants";
import AppRoute from "../enums/Route";

const Login: FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const dispatch = useDispatch();
  const nav: NavigateFunction = useNavigate();
  const params = useSearchParams();
  const urlParamStatus = params[0].get("status");
  const urlParamAction = params[0].get("action");
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const emailRef = useRef<HTMLInputElement | undefined>();
  const passwordRef = useRef<HTMLInputElement | undefined>();

  useEffect(() => {
    if (!urlParamAction) return;
    const fetchUserLogin = async (userCredentials: LoginCredentials) => {
      await axios
        .post(
          `http://localhost:8081/${API_VERSION}/authentication/login`,
          userCredentials
        )
        .then((response) => {
          const { token, isActivated, expiresIn } = response.data;
          dispatch(
            customerActions.getCreds({
              token: token,
              expiresIn: +expiresIn,
              isActivated: isActivated,
            })
          );
          nav(AppRoute.PROFILE.substring(0, 8), { replace: true });
        })
        .catch(() => {
          nav("?status=invalid", { replace: true });
        });
    };
    fetchUserLogin(credentials);
  }, [credentials, dispatch, nav, urlParamAction]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const enteredValue: LoginCredentials = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    setCredentials(enteredValue);
    if (!enteredValue.email || !enteredValue.password) return;
    nav("?action=login-user", { replace: true });
  };
  return (
    <Fragment>
      {isMobile ? (
        <LoginMobile
          Box={Box}
          Loader={CircularProgress}
          actionParam={urlParamAction}
          isMobile={isMobile}
          statusParam={urlParamStatus}
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
          isMobile={isMobile}
          Grid={Grid}
          classes={classes}
          statusParam={urlParamStatus}
          actionParam={urlParamAction}
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
