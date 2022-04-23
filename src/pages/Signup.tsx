import { FC, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { CardContent, Grid, Typography } from "@mui/material";
import SignupForm from "../components/Forms/SignupForm/SignupForm";
import Kard from "../components/UI/Card";
import { useNavigate } from "react-router-dom";
import classes from "../styles/SignupStyles.module.css";
import { PROFILE } from "../components/UI/Constants/Constants";

const Signup: FC<{ URL: string }> = ({ URL }) => {
  const [user, setUser] = useState<{} | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return;
    }
    const fetchUserSignup: (user: {}) => void = async (user) => {
      await axios
        .post(`${URL}/authentication/registration`, user)
        .then((response) => {
          if (response.data.isSaved === true) {
            navigate(PROFILE, { replace: true });
          } else {
            setIsValid(false);
          }
        });
    };
    fetchUserSignup(user);
  }, [user, navigate, URL]);

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
      phoneNumber: string | undefined;
    }>
  ) => {
    setUser(data);
    return;
  };
  return (
    <Grid container>
      <Kard mobile={false} login={null} signup={null} auth={false}>
        <Typography className={classes.cardTitle} variant="h4">
          Please Signup
        </Typography>
        <CardContent>
          <SignupForm
            classes={classes}
            isValid={isValid}
            onGetUserInfo={userInfo}
          />
        </CardContent>
      </Kard>
    </Grid>
  );
};

export default Signup;
