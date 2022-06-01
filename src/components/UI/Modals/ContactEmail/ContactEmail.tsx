import {
  TextFieldProps,
  CardTypeMap,
  ExtendButtonBase,
  ButtonTypeMap,
  GridTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, FC, FormEvent } from "react";
import { createPortal } from "react-dom";
import ContactForm from "../../../Forms/ContactForm/ContactForm";
import Backdrop from "../../Backdrops/Backdrop";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";
import classes from "../../../../styles/Modals/Modals.module.css";

const ContactEmail: FC<{
  setLimit: Dispatch<React.SetStateAction<number>>;
  setView: Dispatch<React.SetStateAction<boolean>>;
  setInvalid: Dispatch<React.SetStateAction<boolean>>;
  Submit: (e: FormEvent<HTMLFormElement>) => void;
  Exit: () => void;
  TextField: (props: TextFieldProps) => JSX.Element;
  Card: OverridableComponent<CardTypeMap<{}, "div">>;
  CardContent: OverridableComponent<CardTypeMap<{}, "div">>;
  Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  email: React.MutableRefObject<HTMLElement | undefined>;
  text: React.MutableRefObject<HTMLElement | undefined>;
  isMobile: boolean;
  invalid: boolean;
  limit: number;
}> = ({
  Exit,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  email,
  text,
  isMobile,
  Submit,
  setView,
  setInvalid,
  invalid,
  limit,
  setLimit,
}) => {
  return (
    <>
      {createPortal(<Backdrop Exit={Exit} />, backdropDiv)}
      {createPortal(
        <ContactForm
          Submit={Submit}
          limit={limit}
          setLimit={setLimit}
          invalid={invalid}
          setInvalid={setInvalid}
          setView={setView}
          isMobile={isMobile}
          classes={classes}
          TextField={TextField}
          Card={Card}
          CardContent={CardContent}
          Button={Button}
          Grid={Grid}
          email={email}
          text={text}
        />,
        overlayDiv
      )}
    </>
  );
};

export default ContactEmail;
