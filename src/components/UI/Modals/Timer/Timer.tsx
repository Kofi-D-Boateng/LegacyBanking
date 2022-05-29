import { Dispatch, FC, MouseEvent, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import Modal from "./Modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import classes from "../../../../styles/Modals/Modals.module.css";
import { Customer } from "../../../../Interfaces/Customer";
import { customerActions } from "../../../../store/customer/customer-slice";

const Timer: FC<{
  isMobile: boolean;
  customer: Customer;
  location: Location;
}> = ({ isMobile, location, customer }) => {
  const [loading, setLoading] = useState<boolean>(false);

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
          params: { token: customer.token },
        })
        .then((response) => {
          const { token, expiresIn } = response.data;
          dispatch(
            customerActions.refreshToken({ token: token, expiresIn: expiresIn })
          );
        })
        .catch(() => dispatch(customerActions.logout()));
    } else {
      dispatch(customerActions.logout());
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
