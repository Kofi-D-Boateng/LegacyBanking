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
} from "../../../../types/CustomerDetails";
import Backdrop from "../../Backdrops/Backdrop";
import classes from "../../../../styles/Modals/Modals.module.css";
import {
  API_VERSION,
  LOCKACCOUNT,
  LOCKCARD,
  LOCKEDACCOUNT,
  LOCKEDACCOUNTMSG,
  LOCKEDCARD,
  LOCKEDCARDMSG,
} from "../../Constants/Constants";
import { backdropDiv } from "../../Layouts/RootElement";
import Modal from "./Modal";

const AccountSecurity: FC<{
  Exit: () => void;
  setAccountSecurityView: (e: MouseEvent<HTMLButtonElement>) => void;
  isMobile: boolean;
  token: string | null;
  account: Account;
  card: AccountCard;
  securityView: string | null;
}> = ({
  Exit,
  isMobile,
  token,
  account,
  card,
  securityView,
  setAccountSecurityView,
}) => {
  const AN: string = account ? account.accountNumber : "";
  console.log(card);
  const setLockedItem = useCallback(async () => {
    if (securityView?.includes(LOCKCARD)) {
      await axios
        .put(
          `http://localhost:8081/${API_VERSION}/authentication/profile/security`,
          {
            requestType: "LOCK CARD",
            cardNumber: card.cardNumber,
          },
          { headers: { authorization: token as string } }
        )
        .then(() => {
          window.location.reload();
        });
    } else if (securityView?.includes(LOCKACCOUNT)) {
      await axios
        .put(
          `${API_VERSION}/authentication/profile/security`,
          {
            requestType: "LOCK ACCOUNT",
            accountNumber: AN,
          },
          { headers: { authorization: token as string } }
        )
        .then(() => {
          window.location.reload();
        });
    }
  }, [AN, securityView, token, card.cardNumber]);

  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, backdropDiv as Element)}
      {createPortal(
        <Modal
          securityView={securityView}
          LOCKCARD={LOCKCARD}
          LOCKEDCARDMSG={LOCKEDCARDMSG}
          LOCKEDCARD={LOCKEDCARD}
          LOCKACCOUNT={LOCKACCOUNT}
          LOCKEDACCOUNTMSG={LOCKEDACCOUNTMSG}
          LOCKEDACCOUNT={LOCKEDACCOUNT}
          isCardLocked={card.isLocked}
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
