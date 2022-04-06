import React, { ChangeEvent, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrops/Backdrop";
import styles from "../../../styles/MoneyTransferStyles";
import {
  Button,
  Card,
  CardContent,
  ClassNameMap,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { backdropDiv, overlayDiv } from "../Layouts/RootElement";

const Modal: React.FC<{
  classes: ClassNameMap<string>;
  Exit: () => void;
  Transfer: (data: {
    email: string | undefined;
    phoneNumber: string | undefined;
    amount: number;
  }) => void;
  choiceHandler: (event: SelectChangeEvent) => void;
  view: boolean;
  termsOfChoice: string;
  isMobile: boolean;
}> = ({
  classes,
  Exit,
  Transfer,
  choiceHandler,
  view,
  termsOfChoice,
  isMobile,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const emailRef = useRef<HTMLInputElement | undefined>();
  const phoneNumberRef = useRef<HTMLInputElement | undefined>();

  const amountHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const regex = /[A-Za-z]/;
    const { value } = event.target;
    if (regex.test(value)) {
      return;
    }
    setAmount(+parseFloat(value).toFixed(2));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const data: {
      email: string | undefined;
      phoneNumber: string | undefined;
      amount: number;
    } = {
      email: emailRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      amount: amount,
    };
    Transfer(data);
  };

  return (
    <Card className={!isMobile ? classes.card : classes.mobileCard}>
      <Grid
        sx={{
          backgroundColor: "purple",
          padding: "20px 0",
        }}
        container
      >
        <Typography
          sx={{
            flexGrow: "1",
            margin: "auto",
            textAlign: "center",
            color: "white",
          }}
          variant="h6"
        >
          Transfer Money from account
        </Typography>
        <IconButton
          onClick={Exit}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Grid>
      <CardContent sx={{ margin: "auto" }}>
        {!view ? (
          <FormControl sx={!isMobile ? { width: "100%" } : { width: "100%" }}>
            <InputLabel id="Choice">Send By....</InputLabel>
            <Select
              labelId="Choice"
              value={termsOfChoice}
              label="Send By"
              onChange={choiceHandler}
            >
              <MenuItem value={"email"}>Email</MenuItem>
              <MenuItem value={"number"}>Phone Number</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <form onSubmit={submitHandler}>
            <Grid sx={{ margin: "50px 0" }} container>
              <Grid
                sx={{ margin: "auto", textAlign: "center" }}
                xs={3}
                md={3}
                item
              >
                <Typography variant="h6">
                  {termsOfChoice === "email" ? "Email: " : "Phone number: "}
                </Typography>
              </Grid>
              {termsOfChoice === "email" ? (
                <Grid xs={9} md={9} item>
                  <TextField
                    label="Email"
                    size="small"
                    type="email"
                    inputRef={emailRef}
                    placeholder="enter transfee's email"
                    fullWidth
                  />
                </Grid>
              ) : (
                <Grid xs={9} md={9} item>
                  <TextField
                    label="Phone Number"
                    size="small"
                    type="tel"
                    inputRef={phoneNumberRef}
                    placeholder="enter transfee's phone number"
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
            <Grid sx={{ margin: "50px 0" }} container>
              <Grid
                sx={{ margin: "auto", textAlign: "center" }}
                xs={3}
                md={3}
                item
              >
                <Typography variant="h6">Amount: </Typography>
              </Grid>
              <Grid xs={9} md={9} item>
                <TextField
                  label="amount"
                  size="small"
                  placeholder="enter transfer amount"
                  type="number"
                  inputProps={{
                    step: "0.01",
                    lang: "en-US",
                  }}
                  onBlur={amountHandler}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container>
              <Button
                className={classes.btn}
                variant="outlined"
                size="small"
                type="submit"
                fullWidth
              >
                Send
              </Button>
            </Grid>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

const MoneyTransfer: React.FC<{
  Exit: () => void;
  onChoice: (event: SelectChangeEvent) => void;
  onTransfer: (data: {
    email: string | undefined;
    phoneNumber: string | undefined;
    amount: number;
  }) => void;
  view: boolean;
  termsOfChoice: string;
  mobile: boolean;
}> = ({ Exit, onTransfer, onChoice, view, termsOfChoice, mobile }) => {
  const classes = styles();
  return (
    <>
      {ReactDOM.createPortal(<Backdrop Exit={Exit} />, backdropDiv)}
      {ReactDOM.createPortal(
        <Modal
          Exit={Exit}
          Transfer={onTransfer}
          choiceHandler={onChoice}
          view={view}
          termsOfChoice={termsOfChoice}
          classes={classes}
          isMobile={mobile}
        />,
        overlayDiv
      )}
    </>
  );
};

export default MoneyTransfer;
