import { Button } from "@mui/material";
import axios from "axios";
import { CSSProperties, Dispatch, FC, MouseEvent } from "react";
import { useDispatch, } from "react-redux";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { customerActions } from "../store/customer/customer-slice";
import AppRoute from "../enums/Route";
import { API_VERSION } from "../components/UI/Constants/Constants";

const WaitingPage: FC<{
  isMobile: boolean;
}> = ({ isMobile }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const STYLE: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: !isMobile ? "50%" : "90%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.3rem",
    color: "#8a2be2",
  };

  const GenerateLink: (e: MouseEvent<HTMLButtonElement>) => void = async () => {
    await axios
      .post(`${API_VERSION}/link/new-link`, {
        token: localStorage.getItem("token") as string,
      })
      .catch(() => {
        dispatch(customerActions.logout());
        navigate(AppRoute.REDIRECT, { replace: true });
      });
  };

  return (
    <div style={STYLE}>
      <h1>Please check your email</h1>
      <p>
        Your account is either disabled or locked. Please check your email for a
        link to activate your account. If you do not see a link, please give us
        a <NavLink to={AppRoute.CONTACT}>call or email.</NavLink>
      </p>
      <p>
        To request a new link for verification please click
        <Button
          variant="text"
          sx={{
            textTransform: "none",
            color: "#8a2be2",
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
