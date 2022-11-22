import { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import Modal from "./Modal";
import axios from "axios";
import { TransferDetails } from "../../../../types/Transfer";
import { Account } from "../../../../types/CustomerDetails";
import { API_VERSION } from "../../Constants/Constants";
import { customerActions } from "../../../../store/customer/customer-slice";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import classes from "../../../../styles/Modals/Modals.module.css";
import { useDispatch } from "react-redux";
import { TransactionType } from "../../../../enums/ProfileEnums";
import AppRoute from "../../../../enums/Route";
import { TransferStatus } from "../../../../enums/TransferStatus";

const MoneyTransfer: FC<{
  token: string | null;
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
  token,
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
  const [transfer, setTransfer] = useState<TransferDetails>({
    accountNumber: AN,
    amount: 0,
    email: myEmail,
    emailOfTransferee: undefined,
    phoneNumberOfTransferee: undefined,
    bankAccountType: account?.bankAccountType,
    transactionType: TransactionType.TRANSFER,
  });
  const dispatch = useDispatch();

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
    };
    if (
      !urlParamAccount ||
      !urlParamDisplay ||
      !urlParamDisplay?.includes(AppRoute.MAINPROFILE) ||
      (urlParamAccount as string) !== account.id.toString()
    ) {
      // dispatch(customerActions.logout());
    }
    if (transfer.emailOfTransferee || transfer.phoneNumberOfTransferee) {
      fetchTransfer(transfer, token);
    }
  }, [
    transfer,
    dispatch,
    setTransferStatus,
    resetInfo,
    token,
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
      setTransfer({
        emailOfTransferee: data.email,
        accountNumber: AN,
        amount: data.amount,
        email: myEmail,
        bankAccountType: account.bankAccountType,
        phoneNumberOfTransferee: data.phoneNumber,
        transactionType: TransactionType.TRANSFER,
      });
      setTransferStatus(TransferStatus.INPROGRESS);
    },
    [AN, account.bankAccountType, myEmail, setTransferStatus]
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
