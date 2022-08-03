import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import SignupForm from "../components/Forms/SignupForm/SignupForm";
import { NavigateFunction, useNavigate } from "react-router-dom";
import classes from "../styles/Signup/SignupStyles.module.css";
import { LOGIN } from "../components/UI/Constants/Constants";
import { UserSignUp } from "../interfaces/Signup";

const Signup: FC<{
  API_VERSION: string | undefined;
  isMobile: boolean;
}> = ({ API_VERSION, isMobile }) => {
  const nav: NavigateFunction = useNavigate();
  const [user, setUser] = useState<UserSignUp | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (user === null) {
      return;
    }
    const fetchUserSignup: (user: {}) => void = async (user) => {
      await axios
        .post(`${API_VERSION}/authentication/registration`, user)
        .then((response) => {
          if (response.data.isSaved === true) {
            nav(LOGIN, { replace: true });
          } else {
            setIsValid(false);
          }
        });
    };
    fetchUserSignup(user);
  }, [user, nav, API_VERSION]);

  const userInfo: (data: UserSignUp) => void = (data) => {
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
