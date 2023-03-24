import { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import Modal from "./Modal";
import axios from "axios";
import { TransferRequest } from "../../../../types/Transfer";
import { Account, CustomerDetails } from "../../../../types/CustomerDetails";
import { API_VERSION } from "../../Constants/Constants";
import { customerActions } from "../../../../store/customer/customer-slice";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import classes from "../../../../styles/Modals/Modals.module.css";
import { useDispatch } from "react-redux";
import {
  TransactionEnv,
  TransactionType,
} from "../../../../enums/ProfileEnums";
import AppRoute from "../../../../enums/Route";
import { TransferStatus } from "../../../../enums/TransferStatus";
import { NavigateFunction, useNavigate } from "react-router-dom";

const MoneyTransfer: FC<{
  isMobile: boolean;
  customer: CustomerDetails;
  mainUrl: string;
  urlParamDisplay: string | null;
  urlParamAccount: string | null;
  urlParamTransferBy: string | null;
  status: string | null;
  setTransferStatus: (param: string) => void;
  Exit: () => void;
  onChoice: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  isMobile,
  mainUrl,
  Exit,
  onChoice,
  urlParamAccount,
  urlParamDisplay,
  urlParamTransferBy,
  customer,
  status,
  setTransferStatus,
}) => {
  const account = customer.accounts[parseInt(urlParamAccount as string)];
  const AN: string = account ? account.accountNumber : "";
  const [transfer, setTransfer] = useState<TransferRequest>({
    accountNumber: AN,
    amount: 0,
    email: customer.email,
    emailOfTransferee: undefined,
    phoneNumberOfTransferee: undefined,
    bankAccountType: account?.bankAccountType,
    transactionType: TransactionType.TRANSFER,
    apiKey: localStorage.getItem("apiKey") as string,
    transactionEnv: TransactionEnv.ONLINE,
  });
  const dispatch = useDispatch();
  const nav: NavigateFunction = useNavigate();

  useEffect(() => {
    if (
      !urlParamAccount ||
      !urlParamDisplay ||
      !urlParamDisplay?.includes(AppRoute.MAINPROFILE) ||
      (urlParamAccount as string) !== account.id.toString()
    ) {
      // dispatch(customerActions.logout());
    }
    if (transfer.emailOfTransferee || transfer.phoneNumberOfTransferee) {
      axios
        .put(`${API_VERSION}/transactions/process-transaction`, transfer, {
          headers: { authorization: localStorage.getItem("token") as string },
        })
        .then(() => {
          setTransferStatus(TransferStatus.SUCCESSFUL_TRANSFER);
          dispatch(customerActions.resetInfo());
          setTimeout(() => {
            nav(mainUrl, { replace: true });
          }, 4000);
        })
        .catch(() => {
          setTransferStatus(TransferStatus.UNSUCCESSFUL_TRANSFER);
          dispatch(customerActions.resetInfo());
          setTimeout(() => {
            nav(mainUrl, { replace: true });
          }, 4000);
        });
    }
  }, [
    transfer,
    dispatch,
    setTransferStatus,
    account.id,
    urlParamAccount,
    urlParamDisplay,
    account.bankAccountType,
    mainUrl,
    nav,
  ]);

  const transferHandler = useCallback(
    (data: {
      email: string | undefined;
      phoneNumber: string | undefined;
      amount: number;
    }) => {
      if (data.email === customer.email) {
        return;
      }
      setTransfer({
        emailOfTransferee: data.email,
        accountNumber: AN,
        amount: data.amount,
        email: customer.email,
        bankAccountType: account.bankAccountType,
        phoneNumberOfTransferee: data.phoneNumber,
        transactionType: TransactionType.TRANSFER,
        apiKey: transfer.apiKey,
        transactionEnv: transfer.transactionEnv,
      });
      setTransferStatus(TransferStatus.INPROGRESS);
    },
    [
      AN,
      account.bankAccountType,
      transfer.apiKey,
      transfer.transactionEnv,
      customer.email,
      setTransferStatus,
    ]
  );

  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, backdropDiv as Element)}
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
        overlayDiv as Element
      )}
    </>
  );
};

export default MoneyTransfer;
