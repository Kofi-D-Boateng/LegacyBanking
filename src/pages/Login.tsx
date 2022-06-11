import { FC, useState, useRef, useEffect, Fragment } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { customerActions } from "../store/customer/customer-slice";
import classes from "../styles/Login/LoginStyles.module.css";
import { credentials } from "../Interfaces/Credentials";
import LoginMobile from "../components/Login/LoginMobile";
import LoginWeb from "../components/Login/LoginWeb";
import LoginForm from "../components/Forms/LoginForm/LoginForm";
import { PROFILE } from "../components/UI/Constants/Constants";

const Login: FC<{
  isMobile: boolean;

  API_VERSION: string | undefined;
}> = ({ isMobile, API_VERSION }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      await axios
        .post(`${API_VERSION}/authentication/login`, login)
        .then((response) => {
          if (response.status === 200) {
            const { token, isLocked, isEnabled, expiresIn } = response.data;
            dispatch(
              customerActions.getCreds({
                token: token,
                expiresIn: +expiresIn,
                isEnabled: isEnabled,
                isLocked: isLocked,
              })
            );
            navigate(PROFILE.substring(0, 8), { replace: true });
          }
        })
        .catch(() => {
          setLoading(false);
          setInvalid(true);
        });
    };
    fetchUserLogin(user);
  }, [user, dispatch, navigate, API_VERSION]);

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
