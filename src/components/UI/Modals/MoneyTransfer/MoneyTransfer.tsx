import { FC, Dispatch, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import { SelectChangeEvent } from "@mui/material";
import Modal from "./Modal";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AxiosStatic } from "axios";

const MoneyTransfer: FC<{
  Location: Location;

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
  CreateTransfer: ActionCreatorWithPayload<
    {
      email: string | undefined;
      amount: number;
      accountNumber: string;
      type: string;
      phoneNumber: string | undefined;
    },
    string
  >;
  Exit: () => void;
  onChoice: (event: SelectChangeEvent) => void;
  axios: AxiosStatic;
  setView: ActionCreatorWithPayload<
    {
      view: string;
    },
    string
  >;
  accountTransfer: {
    email: string | undefined;
    amount: number;
    accountNumber: string;
    type: string;
    phoneNumber: string | undefined;
  };
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
  accountTransfer,
  CreateTransfer,
  axios,
  setView,
  API_VERSION,
  Location,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchTransfer = async (
      accountTransfer: {
        email: string | undefined;
        amount: number;
        accountNumber: string | undefined;
        type: string;
        phoneNumber: string | undefined;
      },
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
              CreateTransfer({
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
    if (accountTransfer.email || accountTransfer.phoneNumber) {
      fetchTransfer(accountTransfer, token);
    }
  }, [
    accountTransfer,
    dispatch,
    CreateTransfer,
    API_VERSION,
    Location,
    axios,
    setView,
    token,
  ]);

  const transferHandler = useCallback(
    (data: {
      email: string | undefined;
      phoneNumber: string | undefined;
      amount: number;
    }) => {
      dispatch(
        CreateTransfer({
          email: data.email,
          accountNumber: accountNum,
          amount: data.amount,
          type: DEBITTRANSFER,
          phoneNumber: data.phoneNumber,
        })
      );
    },
    [accountNum, dispatch, CreateTransfer, DEBITTRANSFER]
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
