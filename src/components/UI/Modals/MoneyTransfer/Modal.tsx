import { CheckCircle, Close, Dangerous } from "@mui/icons-material";
import {
  Card,
  Grid,
  Typography,
  IconButton,
  CardContent,
  MenuItem,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  useState,
  useRef,
  FC,
  FormEvent,
  FocusEvent,
  ChangeEvent,
} from "react";
import Form from "../../../Forms/MoneyTransferForm/Form";
import {
  INPROGRESS,
  SUCCESSFUL_TRANSFER,
  UNSUCCESSFUL_TRANSFER,
} from "../../Constants/Constants";

const Modal: FC<{
  status: string | null;
  classes: {
    readonly [key: string]: string;
  };
  Exit: () => void;
  Transfer: (data: {
    email: string | undefined;
    phoneNumber: string | undefined;
    amount: number;
  }) => void;
  choiceHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
  transferBy: string | null;
}> = ({
  classes,
  Exit,
  Transfer,
  choiceHandler,
  isMobile,
  status,
  transferBy,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const emailRef = useRef<HTMLInputElement | undefined>();
  const phoneNumberRef = useRef<HTMLInputElement | undefined>();

  const options: Array<{ value: string; option: string }> = [
    { value: "email", option: "Email" },
    { value: "phoneNumber", option: "Phone Number" },
  ];

  const amountHandler = (event: FocusEvent<HTMLInputElement>) => {
    const regex = /[A-Za-z]/;
    const { value } = event.target;
    if (regex.test(value)) {
      return;
    }
    setAmount(+parseFloat(value).toFixed(2));
  };

  const submitHandler = (event: FormEvent) => {
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
      {!status?.includes(INPROGRESS) &&
        !status?.includes(UNSUCCESSFUL_TRANSFER) &&
        !status?.includes(SUCCESSFUL_TRANSFER) && (
          <>
            <Grid
              sx={{
                backgroundColor: "#8a2be2",
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
              {!transferBy ? (
                <TextField
                  select
                  size="small"
                  label={"Send By"}
                  onChange={choiceHandler}
                  fullWidth
                >
                  {options.map((t, i) => {
                    return (
                      <MenuItem key={i} value={t.value}>
                        {t.option}
                      </MenuItem>
                    );
                  })}
                </TextField>
              ) : (
                <Form
                  Grid={Grid}
                  TextField={TextField}
                  Button={Button}
                  Typography={Typography}
                  submitHandler={submitHandler}
                  amountHandler={amountHandler}
                  termsOfChoice={transferBy}
                  emailRef={emailRef}
                  phoneNumberRef={phoneNumberRef}
                />
              )}
            </CardContent>
          </>
        )}
      {status?.includes(INPROGRESS) && (
        <div style={{ margin: "40px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {status?.includes(UNSUCCESSFUL_TRANSFER) && (
        <div style={{ margin: "40px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <Dangerous fontSize="large" sx={{ color: "red" }} />
          </Box>
        </div>
      )}
      {status?.includes(SUCCESSFUL_TRANSFER) && (
        <div style={{ margin: "40px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <CheckCircle fontSize="large" sx={{ color: "green" }} />
          </Box>
        </div>
      )}
    </Card>
  );
};

export default Modal;
