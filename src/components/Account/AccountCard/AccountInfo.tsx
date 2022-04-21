import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  ACHDEBIT,
  DEBITTRASFER,
  TRANSFER,
  WITHDRAWAL,
} from "../../UI/Constants/Constants";
import MonthlyExpenditure from "./MonthlyExpenditure/MonthlyExpenditure";

const AccountInfo: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  fName: string;
  lName: string;
  funds: number;
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  mobile: boolean;
  YEAR: number;
  MONTH: number;
  withdrawals: number;
  deposits: number;
  STATEMENT: string;
  SECURITY: string;
  MONEYTRANSFER: string;
  PAPERLESS: string;
  ACCOUNTNUMBER: string;
  setWithdrawals: React.Dispatch<React.SetStateAction<number>>;
  setDeposits: React.Dispatch<React.SetStateAction<number>>;
  onSetView: (event: any) => void;
}> = ({
  classes,
  fName,
  lName,
  funds,
  transactions,
  mobile,
  MONTH,
  YEAR,
  deposits,
  withdrawals,
  ACCOUNTNUMBER,
  MONEYTRANSFER,
  PAPERLESS,
  SECURITY,
  STATEMENT,
  setDeposits,
  setWithdrawals,
  onSetView,
}) => {
  useEffect(() => {
    let withdrawal: number = 0;
    let deposit: number = 0;
    transactions
      .filter((a) => {
        return (
          +a.dateOfTransaction.substring(0, 4) === YEAR &&
          +a.dateOfTransaction.substring(6, 7) === MONTH
        );
      })
      .map((a) => {
        if (
          a.type.includes(WITHDRAWAL) ||
          a.type.includes(TRANSFER) ||
          a.type.includes(ACHDEBIT) ||
          a.type.includes(DEBITTRASFER)
        ) {
          withdrawal = withdrawal + a.amount;
        } else {
          deposit = deposit + a.amount;
        }
        return true;
      });
    const floatWithdrawal = parseFloat(withdrawal.toFixed(2));
    const floatDeposit = parseFloat(deposit.toFixed(2));
    setDeposits(floatDeposit);
    setWithdrawals(floatWithdrawal);
  }, [YEAR, MONTH, transactions, setDeposits, setWithdrawals]);

  const details: { key: number; value: string; desc: string }[] = [
    {
      key: 1,
      value: `$${funds.toLocaleString("en-us")}`,
      desc: "Available balance",
    },
    {
      key: 2,
      value: `+$${deposits.toLocaleString("en-us")}`,
      desc: "Deposits this month",
    },
    {
      key: 3,
      value: `-$${withdrawals.toLocaleString("en-us")}`,
      desc: "Withdrawls this month",
    },
  ];

  const links: { key: number; title: string }[] = [
    { key: 1, title: STATEMENT },
    { key: 2, title: PAPERLESS },
    { key: 3, title: MONEYTRANSFER },
    { key: 4, title: SECURITY },
  ];
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography sx={{ margin: "10px 0" }} variant="h6">
          {fName} {lName}'s account |
          <Button
            sx={{
              color: "purple",
              fontSize: "1.2rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "blue",
              },
            }}
            onClick={onSetView}
            variant="text"
          >
            {ACCOUNTNUMBER}
          </Button>
        </Typography>
        <Grid sx={{ margin: "10px 0" }} container>
          <MonthlyExpenditure details={details} />
        </Grid>
        <hr style={{ backgroundColor: "black", padding: "0.5px 0" }} />
        <Grid container>
          {links.map((l) => {
            return (
              <Grid
                key={l.key}
                className={l.key !== 4 ? classes.linksContainer : ""}
                sx={
                  l.key === 4 ? { textAlign: "center", margin: "auto" } : null
                }
                xs={12 / links.length}
                md={12 / links.length}
                item
              >
                <Button
                  sx={{
                    fontSize: "1rem",
                    textTransform: "none",
                    color: "purple",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "green",
                    },
                  }}
                  size="small"
                  onClick={onSetView}
                >
                  {l.title}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
