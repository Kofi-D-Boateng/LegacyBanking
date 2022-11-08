import { FC, Dispatch, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import { SelectChangeEvent } from "@mui/material";
import Modal from "./Modal";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { AxiosStatic } from "axios";
import { NavigateFunction } from "react-router-dom";
import { TransferDetails } from "../../../../types/Transfer";
import { Account } from "../../../../types/CustomerDetails";
import { MAINPROFILE, TRANSFER } from "../../Constants/Constants";

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
  account: Account;
  axios: AxiosStatic;
  setView: ActionCreatorWithPayload<
    {
      view: string;
    },
    string
  >;
  logout: ActionCreatorWithoutPayload<string>;
  urlParamDisplay: string | null;
  urlParamAccount: string | null;
  nav: NavigateFunction;
  dispatch: Dispatch<any>;
  Exit: () => void;
  onChoice: (event: SelectChangeEvent) => void;
}> = ({
  view,
  termsOfChoice,
  isMobile,
  classes,
  BACKDROPDIV,
  OVERLAYDIV,
  account,
  token,
  Exit,
  onChoice,
  dispatch,
  axios,
  setView,
  API_VERSION,
  Location,
  logout,
  urlParamAccount,
  urlParamDisplay,
}) => {
  const AN: string = account ? account.accountNumber : "";
  const [loading, setLoading] = useState<boolean>(false);
  const [transfer, setTransfer] = useState<TransferDetails>({
    accountNumber: AN,
    amount: 0,
    emailOfTransferee: undefined,
    phoneNumberOfTransferee: undefined,
    bankAccountType: account?.bankAccountType,
    transactionType: TRANSFER,
  });
  useEffect(() => {
    const fetchTransfer = async (
      accountTransfer: TransferDetails,
      token: string | null
    ) => {
      setLoading(true);
      await axios
        .put(
          `http://localhost:8081/${API_VERSION}/authentication/transaction`,
          { accountTransfer: accountTransfer },
          {
            headers: { authorization: token as string },
          }
        )
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            dispatch(
              setTransfer({
                accountNumber: transfer.accountNumber,
                amount: 0,
                emailOfTransferee: "",
                phoneNumberOfTransferee: undefined,
                bankAccountType: account.bankAccountType,
                transactionType: TRANSFER,
              })
            );
          }
          Location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    };
    if (
      !urlParamAccount ||
      !urlParamDisplay ||
      !urlParamDisplay?.includes(MAINPROFILE) ||
      (urlParamAccount as string) !== account.id.toString()
    ) {
      logout();
    }
    if (transfer.emailOfTransferee || transfer.phoneNumberOfTransferee) {
      fetchTransfer(transfer, token);
    }
  }, [
    transfer,
    dispatch,
    API_VERSION,
    Location,
    axios,
    setView,
    token,
    account.id,
    urlParamAccount,
    urlParamDisplay,
    logout,
    account.bankAccountType,
  ]);

  const transferHandler = useCallback(
    (data: {
      email: string | undefined;
      phoneNumber: string | undefined;
      amount: number;
    }) => {
      dispatch(
        setTransfer({
          emailOfTransferee: data.email,
          accountNumber: AN,
          amount: data.amount,
          bankAccountType: account.bankAccountType,
          phoneNumberOfTransferee: data.phoneNumber,
          transactionType: TRANSFER,
        })
      );
    },
    [AN, dispatch, account.bankAccountType]
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
