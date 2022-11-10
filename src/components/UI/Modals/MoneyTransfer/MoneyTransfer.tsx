import {
  FC,
  Dispatch,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import Modal from "./Modal";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { AxiosStatic } from "axios";
import { TransferDetails } from "../../../../types/Transfer";
import { Account } from "../../../../types/CustomerDetails";
import {
  INPROGRESS,
  MAINPROFILE,
  SUCCESSFUL_TRANSFER,
  TRANSFER,
  UNSUCCESSFUL_TRANSFER,
} from "../../Constants/Constants";
import { customerActions } from "../../../../store/customer/customer-slice";

const MoneyTransfer: FC<{
  Location: Location;
  API_VERSION: string | undefined;
  token: string | null;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  BACKDROPDIV: HTMLElement | null;
  OVERLAYDIV: HTMLElement | null;
  myEmail: string;
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
  urlParamTransferBy: string | null;
  status: string | null;
  setTransferStatus: (param: string) => void;
  resetInfo: () => void;
  dispatch: Dispatch<any>;
  Exit: () => void;
  onChoice: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({
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
  urlParamTransferBy,
  myEmail,
  status,
  resetInfo,
  setTransferStatus,
}) => {
  const AN: string = account ? account.accountNumber : "";
  const [transfer, setTransfer] = useState<TransferDetails>({
    accountNumber: AN,
    amount: 0,
    email: myEmail,
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
      await axios
        .put(
          `${API_VERSION}/authentication/transaction`,
          {
            accountTransfer: accountTransfer,
            typeOfTransaction: "ACCOUNT_TRANSACTION",
          },
          {
            headers: { authorization: token as string },
          }
        )
        .then(() => {
          dispatch(customerActions.resetInfo());
          setTransferStatus(SUCCESSFUL_TRANSFER);
          setTimeout(() => {
            resetInfo();
          }, 4000);
        })
        .catch(() => {
          setTransferStatus(UNSUCCESSFUL_TRANSFER);
          setTimeout(() => {
            resetInfo();
          }, 4000);
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
    setTransferStatus,
    resetInfo,
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
      setTransfer({
        emailOfTransferee: data.email,
        accountNumber: AN,
        amount: data.amount,
        email: myEmail,
        bankAccountType: account.bankAccountType,
        phoneNumberOfTransferee: data.phoneNumber,
        transactionType: TRANSFER,
      });
      setTransferStatus(INPROGRESS);
    },
    [AN, account.bankAccountType, myEmail, setTransferStatus]
  );

  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV as Element)}
      {createPortal(
        <Modal
          Exit={Exit}
          Transfer={transferHandler}
          choiceHandler={onChoice}
          transferBy={urlParamTransferBy}
          classes={classes}
          isMobile={isMobile}
          status={status}
        />,
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default MoneyTransfer;
