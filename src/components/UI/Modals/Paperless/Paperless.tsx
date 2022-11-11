import { ChangeEvent, FC, useCallback } from "react";
import ReactDOM from "react-dom";
import Backdrop from "../../Backdrops/Backdrop";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "./Modal";
import { AxiosStatic } from "axios";

const Paperless: FC<{
  Exit: () => void;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
  BACKDROPDIV: HTMLElement | null;
  OVERLAYDIV: HTMLElement | null;

  API_VERSION: string | undefined;
  token: string | null;
  axios: AxiosStatic;
}> = ({
  Exit,
  isMobile,
  classes,
  BACKDROPDIV,
  OVERLAYDIV,
  API_VERSION,
  token,
  axios,
}) => {
  const setBillingType = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      await axios
        .put(
          `${API_VERSION}/authentication/billing`,
          { choice: value },
          {
            headers: { authorization: token as string },
          }
        )
        .then(() => {
          Exit();
        })
        .catch(() => Exit());
    },
    [API_VERSION, Exit, axios, token]
  );

  return (
    <>
      {ReactDOM.createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV as Element)}
      {ReactDOM.createPortal(
        <Modal
          Card={Card}
          CardContent={CardContent}
          Grid={Grid}
          Typography={Typography}
          IconButton={IconButton}
          CloseIcon={CloseIcon}
          FormControl={FormControl}
          FormControlLabel={FormControlLabel}
          RadioGroup={RadioGroup}
          Radio={Radio}
          classes={classes}
          Exit={Exit}
          setBillingType={setBillingType}
          isMobile={isMobile}
        />,
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default Paperless;
