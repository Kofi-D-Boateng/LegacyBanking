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
import { AxiosStatic } from "axios";
import { FC, MouseEvent, useCallback, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { Account } from "../../../../types/CustomerDetails";
import Backdrop from "../../Backdrops/Backdrop";
import {
  LOCKACCOUNT,
  LOCKCARD,
  LOCKEDACCOUNT,
  LOCKEDACCOUNTMSG,
  LOCKEDCARD,
  LOCKEDCARDMSG,
} from "../../Constants/Constants";
import Modal from "./Modal";

const AccountSecurity: FC<{
  Exit: () => void;
  setAccountSecurityView: (e: MouseEvent<HTMLButtonElement>) => void;
  BACKDROPDIV: HTMLElement | null;
  OVERLAYDIV: HTMLElement | null;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };

  API_VERSION: string | undefined;
  token: string | null;
  account: Account;
  isCardLocked: boolean;
  Location: Location;
  axios: AxiosStatic;
  securityView: string | null;
}> = ({
  Exit,
  BACKDROPDIV,
  OVERLAYDIV,
  classes,
  isMobile,
  API_VERSION,
  token,
  account,
  Location,
  axios,
  isCardLocked,
  securityView,
  setAccountSecurityView,
}) => {
  const AN: string = account ? account.accountNumber : "";

  const setLockedItem = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      await axios
        .post(
          `${API_VERSION}/authentication/profile/security`,
          {
            card: securityView?.includes(LOCKCARD) && value,
            account: securityView?.includes(LOCKACCOUNT) && value,
            accountNumber: AN,
          },
          { headers: { authorization: token as string } }
        )
        .then(() => {
          Location.reload();
        });
    },
    [AN, API_VERSION, Location, axios, securityView, token]
  );

  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV as Element)}
      {createPortal(
        <Modal
          securityView={securityView}
          LOCKCARD={LOCKCARD}
          LOCKEDCARDMSG={LOCKEDCARDMSG}
          LOCKEDCARD={LOCKEDCARD}
          LOCKACCOUNT={LOCKACCOUNT}
          LOCKEDACCOUNTMSG={LOCKEDACCOUNTMSG}
          LOCKEDACCOUNT={LOCKEDACCOUNT}
          isCardLocked={isCardLocked}
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
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default AccountSecurity;
