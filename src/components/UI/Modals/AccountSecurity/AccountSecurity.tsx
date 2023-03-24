import { Close, Lock, CreditCard } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { FC, MouseEvent, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Account,
  Card as AccountCard,
  CustomerDetails,
} from "../../../../types/CustomerDetails";
import Backdrop from "../../Backdrops/Backdrop";
import classes from "../../../../styles/Modals/Modals.module.css";
import {
  API_VERSION,
  LOCKEDACCOUNT,
  LOCKEDCARD,
} from "../../Constants/Constants";
import { backdropDiv } from "../../Layouts/RootElement";
import Modal from "./Modal";
import { AccountType, ProfileModal } from "../../../../enums/ProfileEnums";
import { SecurityMessage } from "../../../../enums/SecurityMessage";

const AccountSecurity: FC<{
  Exit: () => void;
  setAccountSecurityView: (e: MouseEvent<HTMLButtonElement>) => void;
  isMobile: boolean;
  customer: CustomerDetails;
  accountParam: string | null;
  securityView: string | null;
}> = ({
  Exit,
  isMobile,
  customer,
  accountParam,
  securityView,
  setAccountSecurityView,
}) => {
  const account = customer.accounts[parseInt(accountParam as string)];
  const card: AccountCard | undefined = customer.cards.find((card) => {
    if (account?.bankAccountType?.includes(AccountType.CREDIT)) {
      return card.creditType === account.creditType;
    } else {
      return card;
    }
  });
  const AN: string = account ? account.accountNumber : "";

  const setLockedItem = useCallback(async () => {
    if (securityView?.includes(ProfileModal.LOCKCARD)) {
      await axios
        .put(
          `${API_VERSION}/customer/security`,
          {
            requestType: "LOCK CARD",
            cardNumber: card?.cardNumber,
            apiKey: localStorage.getItem("apiKey") as string,
          },
          {
            headers: { authorization: localStorage.getItem("token") as string },
          }
        )
        .then(() => {
          window.location.reload();
        });
    } else if (securityView?.includes(ProfileModal.LOCKACCOUNT)) {
      await axios
        .put(
          `${API_VERSION}/customer/security`,
          {
            requestType: "LOCK ACCOUNT",
            accountNumber: AN,
            apiKey: localStorage.getItem("apiKey") as string,
          },
          {
            headers: { authorization: localStorage.getItem("token") as string },
          }
        )
        .then(() => {
          window.location.reload();
        });
    }
  }, [AN, securityView, card?.cardNumber]);

  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, backdropDiv as Element)}
      {createPortal(
        <Modal
          securityView={securityView}
          LOCKCARD={ProfileModal.LOCKCARD}
          LOCKEDCARDMSG={SecurityMessage.LOCKEDCARDMSG}
          LOCKEDCARD={LOCKEDCARD}
          LOCKACCOUNT={ProfileModal.LOCKACCOUNT}
          LOCKEDACCOUNTMSG={SecurityMessage.LOCKEDACCOUNTMSG}
          LOCKEDACCOUNT={LOCKEDACCOUNT}
          isCardLocked={card?.isLocked as boolean}
          Card={Card}
          CardContent={CardContent}
          Grid={Grid}
          Typography={Typography}
          IconButton={IconButton}
          Close={Close}
          FormControl={FormControl}
          FormControlLabel={FormControlLabel}
          RadioGroup={RadioGroup}
          Radio={Radio}
          Lock={Lock}
          CreditCard={CreditCard}
          Exit={Exit}
          classes={classes}
          isMobile={isMobile}
          setLockedItem={setLockedItem}
          setAccountSecurityView={setAccountSecurityView}
        />,
        backdropDiv as Element
      )}
    </>
  );
};

export default AccountSecurity;
