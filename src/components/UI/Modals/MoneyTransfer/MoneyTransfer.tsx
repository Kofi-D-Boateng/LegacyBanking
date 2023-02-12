import { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import Modal from "./Modal";
import axios from "axios";
import { TransferRequest } from "../../../../types/Transfer";
import { Account } from "../../../../types/CustomerDetails";
import { API_VERSION } from "../../Constants/Constants";
import { customerActions } from "../../../../store/customer/customer-slice";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import classes from "../../../../styles/Modals/Modals.module.css";
import { useDispatch } from "react-redux";
import { TransactionEnv, TransactionType } from "../../../../enums/ProfileEnums";
import AppRoute from "../../../../enums/Route";
import { TransferStatus } from "../../../../enums/TransferStatus";

const MoneyTransfer: FC<{
  isMobile: boolean;
  myEmail: string;
  account: Account;
  urlParamDisplay: string | null;
  urlParamAccount: string | null;
  urlParamTransferBy: string | null;
  status: string | null;
  setTransferStatus: (param: string) => void;
  resetInfo: () => void;
  Exit: () => void;
  onChoice: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({
  isMobile,
  account,
  Exit,
  onChoice,
  urlParamAccount,
  urlParamDisplay,
  urlParamTransferBy,
  myEmail,
  status,
  resetInfo,
  setTransferStatus,
}) => {
  const AN: string = account ? account.accountNumber : "";
  const [transfer, setTransfer] = useState<TransferRequest>({
    accountNumber: AN,
    amount: 0,
    email: myEmail,
    emailOfTransferee: undefined,
    phoneNumberOfTransferee: undefined,
    bankAccountType: account?.bankAccountType,
    transactionType: TransactionType.TRANSFER,
    apiKey:localStorage.getItem("apiKey") as string,
    transactionEnv:TransactionEnv.ONLINE
  });
  const dispatch = useDispatch();

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
        .put(
          `http://localhost:8081/${API_VERSION}/transactions/process-transaction`,
          transfer,
          {
            headers: { authorization: localStorage.getItem("token") as string },
          }
        )
        .then(() => {
          dispatch(customerActions.resetInfo());
          setTransferStatus(TransferStatus.SUCCESSFUL_TRANSFER);
          setTimeout(() => {
            resetInfo();
          }, 4000);
        })
        .catch(() => {
          setTransferStatus(TransferStatus.UNSUCCESSFUL_TRANSFER);
          setTimeout(() => {
            resetInfo();
          }, 4000);
        });
    }
  }, [
    transfer,
    dispatch,
    setTransferStatus,
    resetInfo,
    account.id,
    urlParamAccount,
    urlParamDisplay,
    account.bankAccountType,
  ]);

  const transferHandler = useCallback(
    (data: {
      email: string | undefined;
      phoneNumber: string | undefined;
      amount: number;
    }) => {
      if(data.email === myEmail){
        return;
      }
      setTransfer({
        emailOfTransferee: data.email,
        accountNumber: AN,
        amount: data.amount,
        email: myEmail,
        bankAccountType: account.bankAccountType,
        phoneNumberOfTransferee: data.phoneNumber,
        transactionType: TransactionType.TRANSFER,
        apiKey:transfer.apiKey,
        transactionEnv:transfer.transactionEnv
      });
      setTransferStatus(TransferStatus.INPROGRESS);
    },
    [AN, account.bankAccountType,transfer.apiKey,transfer.transactionEnv, myEmail, setTransferStatus]
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
