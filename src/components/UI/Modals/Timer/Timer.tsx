import { Dispatch, FC, MouseEvent, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import Modal from "./Modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { authActions } from "../../../../store/authentication/auth-slice";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Auth } from "../../../../Interfaces/Auth";
import classes from "../../../../styles/Modals.module.css";

const Timer: FC<{ isMobile: boolean; auth: Auth; location: Location }> = ({
  isMobile,
  location,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const TOKEN: string | null = useSelector(
    (state: RootState) => state.auth.token
  );
  const dispatch: Dispatch<any> = useDispatch();
  const getRefreshToken: (e: MouseEvent<HTMLButtonElement>) => void = async ({
    currentTarget,
  }) => {
    const CHOICE: string = currentTarget.innerText;
    console.log(CHOICE);
    if (CHOICE.includes("Yes")) {
      setLoading(true);
      await axios
        .get(`http://localhost:8081/api/v1/authentication/get-refresh-token`, {
          params: { token: TOKEN },
        })
        .then((response) => {
          const { token, expiresIn } = response.data;
          dispatch(
            authActions.refreshToken({ token: token, expiresIn: expiresIn })
          );
        })
        .catch(() => dispatch(authActions.logout()));
    } else {
      dispatch(authActions.logout());
    }
    location.reload();
  };
  const exitHandler: () => void = () => {};
  return (
    <>
      {createPortal(<Backdrop Exit={exitHandler} />, backdropDiv)}
      {createPortal(
        <Modal
          Loader={CircularProgress}
          loading={loading}
          isMobile={isMobile}
          classes={classes}
          GRT={getRefreshToken}
          Grid={Grid}
          Typography={Typography}
          Button={Button}
          Card={Card}
          CardContent={CardContent}
        />,
        overlayDiv
      )}
    </>
  );
};

export default Timer;
