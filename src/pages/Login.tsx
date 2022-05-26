import { FC, useState, useRef, useEffect, Fragment } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authentication/auth-slice";
import classes from "../styles/LoginStyles.module.css";
import { credentials } from "../Interfaces/Credentials";
import LoginMobile from "../components/Login/LoginMobile";
import LoginWeb from "../components/Login/LoginWeb";
import LoginForm from "../components/Forms/LoginForm/LoginForm";

const Login: FC<{
  isMobile: boolean;
  URL: string | undefined;
}> = ({ isMobile, URL }) => {
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
        .post(`${URL}/authentication/login`, login)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            const { token, isLocked, isEnabled, expiresIn } = response.data;
            console.log("isEnabled: " + isEnabled);
            console.log("isLocked: " + isLocked);
            dispatch(
              authActions.getCreds({
                token: token,
                expiresIn: +expiresIn,
              })
            );
            navigate("/profile", { replace: true });
          }
        })
        .catch(() => {
          setLoading(false);
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
