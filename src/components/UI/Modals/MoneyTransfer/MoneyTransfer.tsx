import { FC, Dispatch, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import { SelectChangeEvent } from "@mui/material";
import Modal from "./Modal";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AxiosStatic } from "axios";
import { NavigateFunction } from "react-router-dom";
import { TransferDetails } from "../../../../interfaces/Transfer";

const MoneyTransfer: FC<{
  Location: Location;
  nav: NavigateFunction;
  API_VERSION: string | undefined;
  token: string | null;
  view: boolean;
  termsOfChoice: string;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  BACKDROPDIV: HTMLElement | null;
  OVERLAYDIV: HTMLElement | null;
  accountNum: string;
  DEBITTRANSFER: string;
  dispatch: Dispatch<any>;
  Exit: () => void;
  onChoice: (event: SelectChangeEvent) => void;
  axios: AxiosStatic;
  setView: ActionCreatorWithPayload<
    {
      view: string;
    },
    string
  >;
}> = ({
  view,
  termsOfChoice,
  isMobile,
  classes,
  BACKDROPDIV,
  OVERLAYDIV,
  DEBITTRANSFER,
  accountNum,
  token,
  Exit,
  onChoice,
  dispatch,
  axios,
  setView,
  API_VERSION,
  Location,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transfer, setTransfer] = useState<TransferDetails>({
    accountNumber: "",
    amount: 0,
    email: undefined,
    phoneNumber: undefined,
    type: "",
  });
  useEffect(() => {
    const fetchTransfer = async (
      accountTransfer: TransferDetails,
      token: string | null
    ) => {
      setLoading(true);
      await axios
        .put(`${API_VERSION}/authentication/transaction`, accountTransfer, {
          headers: { authorization: token as string },
        })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            dispatch(
              setTransfer({
                accountNumber: "",
                amount: 0,
                email: undefined,
                phoneNumber: undefined,
                type: "",
              })
            );
          }
          Location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    };
    if (transfer.email || transfer.phoneNumber) {
      fetchTransfer(transfer, token);
    }
  }, [transfer, dispatch, API_VERSION, Location, axios, setView, token]);

  const transferHandler = useCallback(
    (data: {
      email: string | undefined;
      phoneNumber: string | undefined;
      amount: number;
    }) => {
      dispatch(
        setTransfer({
          email: data.email,
          accountNumber: accountNum,
          amount: data.amount,
          type: DEBITTRANSFER,
          phoneNumber: data.phoneNumber,
        })
      );
    },
    [accountNum, dispatch, DEBITTRANSFER]
  );

  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV as Element)}
      {createPortal(
        <Modal
          Exit={Exit}
          Transfer={transferHandler}
          choiceHandler={onChoice}
          view={view}
          termsOfChoice={termsOfChoice}
          classes={classes}
          isMobile={isMobile}
          loading={loading}
        />,
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default MoneyTransfer;
