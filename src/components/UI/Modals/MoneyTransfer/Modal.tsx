import { Close } from "@mui/icons-material";
import {
  SelectChangeEvent,
  Card,
  Grid,
  Typography,
  IconButton,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState, useRef } from "react";
import Form from "../../../Forms/MoneyTransferForm/Form";

const Modal: React.FC<{
  loading: boolean;
  classes: {
    readonly [key: string]: string;
  };
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
  loading,
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
      {!loading ? (
        <>
          {" "}
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
              <Close sx={{ color: "white" }} />
            </IconButton>
          </Grid>
          <CardContent sx={{ margin: "auto" }}>
            {!view ? (
              <FormControl sx={{ width: "100%" }}>
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
              <Form
                Grid={Grid}
                TextField={TextField}
                Button={Button}
                Typography={Typography}
                submitHandler={submitHandler}
                amountHandler={amountHandler}
                termsOfChoice={termsOfChoice}
                emailRef={emailRef}
                phoneNumberRef={phoneNumberRef}
              />
            )}
          </CardContent>
        </>
      ) : (
        <div style={{ margin: "40px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
    </Card>
  );
};

export default Modal;
