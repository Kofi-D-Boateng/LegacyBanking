import { Button } from "@mui/material";
import { AxiosStatic } from "axios";
import { CSSProperties, Dispatch, FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { CONTACT, REDIRECT } from "../components/UI/Constants/Constants";
import { authActions } from "../store/authentication/auth-slice";

const WaitingPage: FC<{
  token: string | null;
  axios: AxiosStatic;
  URL: string;
}> = ({ token, axios, URL }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const STYLE: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.3rem",
    color: "purple",
  };

  const GenerateLink: (e: MouseEvent<HTMLButtonElement>) => void = async () => {
    await axios
      .post(`${URL}/authentication/new-verification-link`, {
        token: token,
      })
      .catch(() => {
        dispatch(authActions.logout());
        navigate(REDIRECT, { replace: true });
      });
  };

  return (
    <div style={STYLE}>
      <h1>Please check your email</h1>
      <p>
        Your account is either disabled or locked. Please check your email for a
        link to activate your account. If you do not see a link, please give us
        a <NavLink to={CONTACT}>call or email.</NavLink>
      </p>
      <p>
        To request a new link for verification please click
        <Button
          variant="text"
          sx={{
            textTransform: "none",
            color: "purple",
            fontSize: "1.3rem",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={GenerateLink}
        >
          here
        </Button>
      </p>
    </div>
  );
};

export default WaitingPage;
