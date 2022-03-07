import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState, useRef, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { NavLink } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import Kard from "../components/UI/Card";

const styles = makeStyles(() => ({
  cardTitle: {
    backgroundColor: "lightgray",
    padding: "20px 0",
  },
  inputField: {
    margin: "20px 0",
  },
  btn: {
    borderColor: "green",
    color: "black",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      borderColor: "green",
    },
  },
  invalid: {
    backgroundColor: "red",
    color: "white",
    padding: "20px 0",
    transition: "0.5 ease in",
  },
}));

const Login: React.FC = () => {
  interface credentials {
    email: string | undefined;
    password: string | undefined;
  }
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
        .post("http://localhost:8080/api/v1/customer/login", login)
        .then((response) => {
          console.log(response.status);
          console.log(response.headers);
          console.log(response.data);
          if (response.data === undefined) {
            console.log(true);
          }
        });
    };
    fetchUserLogin(user);
    console.log(user);
  }, [user]);

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
    <Container>
      <Kard>
        <Typography className={classes.cardTitle} variant="h4">
          Please Login
        </Typography>
        {invalid && (
          <Grid className={classes.invalid}>
            <Typography variant="h6">Invalid email or password</Typography>
          </Grid>
        )}
        <CardContent>
          <form onSubmit={submitHandler}>
            <Grid container>
              <Grid sx={{ margin: "auto" }} xs={4} lg={4} item>
                <Typography variant="h6">Email: </Typography>
              </Grid>
              <Grid xs={8} lg={8} item>
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
            </Grid>
            <Grid container>
              <Grid sx={{ margin: "auto" }} xs={4} lg={4} item>
                <Typography variant="h6">Password: </Typography>
              </Grid>
              <Grid xs={8} lg={8} item>
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
            </Grid>
            <Button
              className={classes.btn}
              variant="outlined"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
          <Grid sx={{ margin: "10px 0" }} container>
            <Grid xs={12} md={12} item>
              <NavLink to={"/forgot-password"} placeholder="test">
                <Typography variant="body1">Forgot password</Typography>
              </NavLink>
            </Grid>
          </Grid>
        </CardContent>
        <CardActionArea sx={{ padding: "20px 0", backgroundColor: "green" }}>
          <NavLink style={{ textDecoration: "none" }} to={"/signup"}>
            <Typography
              sx={{ fontSize: "1.2rem", color: "white" }}
              variant="body1"
            >
              Open an account
            </Typography>
          </NavLink>
        </CardActionArea>
      </Kard>
    </Container>
  );
};

export default Login;
