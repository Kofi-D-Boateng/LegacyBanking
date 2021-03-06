import { FC, useEffect, useState } from "react";
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
import { NavigateFunction } from "react-router-dom";

const Paperless: FC<{
  Exit: () => void;
  isMobile: boolean;
  nav: NavigateFunction;
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
  const [choice, setChoice] = useState<{
    isSelected: boolean;
    choice: string;
  }>({ isSelected: false, choice: "" });

  useEffect(() => {
    const fetchPaperless: (
      choice: string,
      token: string | null
    ) => void = async (choice, token) => {
      await axios
        .put(
          `${API_VERSION}/authentication/billing`,
          { choice: choice },
          {
            headers: { authorization: token as string },
          }
        )
        .then(() => {
          Exit();
        });
    };

    if (choice.isSelected) {
      fetchPaperless(choice.choice, token);
    }
  }, [choice, Exit, API_VERSION, token, axios]);

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
          setChoice={setChoice}
          isMobile={isMobile}
        />,
        OVERLAYDIV as Element
      )}
    </>
  );
};

export default Paperless;
