import { FC, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import SignupForm from "../components/Forms/SignupForm/SignupForm";
import { useNavigate } from "react-router-dom";
import classes from "../styles/Signup/SignupStyles.module.css";
import { PROFILE } from "../components/UI/Constants/Constants";

const Signup: FC<{
  API_VERSION: string | undefined;
  isMobile: boolean;
}> = ({ API_VERSION, isMobile }) => {
  const [user, setUser] = useState<{} | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return;
    }
    const fetchUserSignup: (user: {}) => void = async (user) => {
      await axios
        .post(`${API_VERSION}/authentication/registration`, user)
        .then((response) => {
          if (response.data.isSaved === true) {
            navigate(PROFILE.substring(0, 8), { replace: true });
          } else {
            setIsValid(false);
          }
        });
    };
    fetchUserSignup(user);
  }, [user, navigate, API_VERSION]);

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
      <Card className={!isMobile ? classes.card : classes.mobCard}>
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
      </Card>
    </Grid>
  );
};

export default Signup;
