import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CardContent, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import SignupForm from "../components/Forms/SignupForm/SignupForm";
import Kard from "../components/UI/Card";
import { useNavigate } from "react-router-dom";

const styles = makeStyles(() => ({
  cardTitle: {
    backgroundColor: "lightgray",
    padding: "20px 0",
  },
  inputField: {
    margin: "20px auto",
    maxWidth: "80%",
  },
  btn: {
    margin: "8px 0",
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

const Signup: React.FC = () => {
  const [user, setUser] = useState<{} | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return;
    }
    const fetchUserSignup = async (register: {}) => {
      console.log(register);
      await axios
        .post(
          "http://localhost:8081/api/v1/authentication/registration",
          register
        )
        .then((response) => {
          if (response.data.isSaved === true) {
            navigate("/", { replace: true });
          } else {
            setIsValid(false);
          }
        });
    };
    fetchUserSignup(user);
  }, [user, navigate]);

  const userInfo = (
    data: SetStateAction<{
      firstName: string | undefined;
      lastName: string | undefined;
      email: string | undefined;
      dob: string | undefined;
      country: string | undefined;
      state: string | undefined;
      zipcode: string | undefined;
      socialSecurity: string | undefined;
      password: string | undefined;
    }>
  ) => {
    setUser(data);
    return;
  };
  const classes = styles();
  return (
    <Grid container>
      <Kard>
        <Typography className={classes.cardTitle} variant="h4">
          Please Signup
        </Typography>
        <CardContent>
          <SignupForm classes={classes} onGetUserInfo={userInfo} />
        </CardContent>
      </Kard>
    </Grid>
  );
};

export default Signup;
