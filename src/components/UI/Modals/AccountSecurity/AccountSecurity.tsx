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
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import { AxiosStatic } from "axios";
import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import {
  LOCKACCOUNT,
  LOCKCARD,
  LOCKEDACCOUNT,
  LOCKEDACCOUNTMSG,
  LOCKEDCARD,
  LOCKEDCARDMSG,
  SECURITYERRORMSG,
} from "../../Constants/Constants";
import Modal from "./Modal";

const AccountSecurity: FC<{
  Exit: () => void;
  BACKDROPDIV: HTMLElement;
  OVERLAYDIV: HTMLElement;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  URL: string;
  token: string;
  accountNumber: string;
  Location: Location;
  axios: AxiosStatic;
}> = ({
  Exit,
  BACKDROPDIV,
  OVERLAYDIV,
  classes,
  isMobile,
  URL,
  token,
  accountNumber,
  Location,
  axios,
}) => {
  const [view, setView] = useState<string>("");
  const [choice, setChoice] = useState<{ choice: boolean; item: string }>({
    choice: false,
    item: "",
  });

  useEffect(() => {
    if (!choice.choice) {
      return;
    }
    const fetchSettings: (
      choice: {
        choice: boolean;
        item: string;
      },
      accountNumber: string
    ) => void = async ({ item }) => {
      await axios
        .post(
          `${URL}/authentication/profile/security`,
          {
            card: item.includes(LOCKEDCARD) && true,
            account: item.includes(LOCKEDACCOUNT) && true,
            accountNumber: accountNumber,
          },
          { headers: { authorization: token } }
        )
        .catch(() => {
          setChoice({ choice: true, item: SECURITYERRORMSG });
        });
    };
    fetchSettings(choice, accountNumber);
  }, [URL, token, choice, axios, accountNumber]);

  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV)}
      {createPortal(
        <Modal
          setChoice={setChoice}
          setView={setView}
          view={view}
          choice={choice}
          LOCKCARD={LOCKCARD}
          LOCKEDCARDMSG={LOCKEDCARDMSG}
          LOCKEDCARD={LOCKEDCARD}
          LOCKACCOUNT={LOCKACCOUNT}
          LOCKEDACCOUNTMSG={LOCKEDACCOUNTMSG}
          LOCKEDACCOUNT={LOCKEDACCOUNT}
          MenuItem={MenuItem}
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
        />,
        OVERLAYDIV
      )}
    </>
  );
};

export default AccountSecurity;
