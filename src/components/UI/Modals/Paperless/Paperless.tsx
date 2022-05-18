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

const Paperless: FC<{
  Exit: () => void;
  isMobile: boolean;

  classes: {
    readonly [key: string]: string;
  };
  BACKDROPDIV: HTMLElement;
  OVERLAYDIV: HTMLElement;
  URL: string | undefined;
  token: string;
  axios: AxiosStatic;
}> = ({
  Exit,
  isMobile,
  classes,
  BACKDROPDIV,
  OVERLAYDIV,
  URL,
  token,
  axios,
}) => {
  const [choice, setChoice] = useState<{
    isSelected: boolean;
    choice: string;
  }>({ isSelected: false, choice: "" });

  useEffect(() => {
    const fetchPaperless: (choice: string, token: string) => void = async (
      choice,
      token
    ) => {
      await axios
        .post(
          `${URL}/authentication/billing`,
          { choice: choice },
          {
            headers: { authorization: token },
          }
        )
        .then((response) => {
          console.log(response);
          Exit();
        });
    };

    if (choice.isSelected) {
      fetchPaperless(choice.choice, token);
    }
  }, [choice, Exit, URL, token, axios]);

  return (
    <>
      {ReactDOM.createPortal(<Backdrop Exit={Exit} />, BACKDROPDIV)}
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
        OVERLAYDIV
      )}
    </>
  );
};

export default Paperless;
