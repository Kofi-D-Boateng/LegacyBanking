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
import classes from "../../../../styles/Modals/Modals.module.css";
import Modal from "./Modal";
import axios from "axios";
import { API_VERSION } from "../../Constants/Constants";
import { backdropDiv, overlayDiv } from "../../Layouts/RootElement";

const Paperless: FC<{
  Exit: () => void;
  isMobile: boolean;
  token: string | null;
}> = ({ Exit, isMobile, token }) => {
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
    [Exit, token]
  );

  return (
    <>
      {ReactDOM.createPortal(<Backdrop Exit={Exit} />, backdropDiv as Element)}
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
        overlayDiv as Element
      )}
    </>
  );
};

export default Paperless;
