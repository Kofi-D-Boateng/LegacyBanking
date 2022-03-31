import Backdrop from "../Backdrops/Backdrop";
import styles from "../../../styles/MoneyTransferStyles";
import {
  Button,
  Card,
  CardContent,
  ClassNameMap,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

const backdropDiv: HTMLElement = document.getElementById("backdrop-root")!;
const overlayDiv: HTMLElement = document.getElementById("overlay-root")!;

const Modal: React.FC<{
  classes: ClassNameMap<string>;
  Exit: () => void;
  Transfer: (data: {
    email: string | undefined;
    phoneNumber: string | undefined;
    amount: number;
  }) => void;
}> = ({ classes, Exit, Transfer }) => {
  const [amount, setAmount] = useState<number>(0);
  const emailRef = useRef<HTMLInputElement | undefined>();
  const phoneNumberRef = useRef<HTMLInputElement | undefined>();

  const amountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAmount(parseFloat(value));
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
    <Card className={classes.card} onClick={Exit}>
      <Typography
        sx={{
          backgroundColor: "lightgray",
          padding: "20px 0",
          textAlign: "center",
        }}
        variant="h6"
      >
        Transfer Money from account
      </Typography>
      <CardContent>
        <form onSubmit={submitHandler}>
          <Grid sx={{ margin: "50px 0" }} container>
            <Grid sx={{ margin: "auto" }} xs={3} md={3} item>
              <Typography variant="h6">Enter Email</Typography>
            </Grid>
            <Grid xs={9} md={9} item>
              <TextField
                label="email"
                size="small"
                type="email"
                placeholder="enter transfee's email"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid sx={{ margin: "50px 0" }} container>
            <Grid sx={{ margin: "auto" }} xs={3} md={3} item>
              <Typography variant="h6">Enter Amount</Typography>
            </Grid>
            <Grid xs={9} md={9} item>
              <TextField
                label="amount"
                size="small"
                placeholder="enter transfer amount"
                type="number"
                onChange={amountHandler}
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
      </CardContent>
    </Card>
  );
};

const MoneyTransfer: React.FC<{
  Exit: () => void;
  onTransfer: (data: {
    email: string | undefined;
    phoneNumber: string | undefined;
    amount: number;
  }) => void;
}> = ({ Exit, onTransfer }) => {
  const classes = styles();
  return (
    <>
      {ReactDOM.createPortal(<Backdrop Exit={Exit} />, backdropDiv)}
      {ReactDOM.createPortal(
        <Modal Exit={Exit} Transfer={onTransfer} classes={classes} />,
        overlayDiv
      )}
    </>
  );
};

export default MoneyTransfer;
