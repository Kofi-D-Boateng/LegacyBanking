import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { ClassNameMap } from "@mui/styles/withStyles";
import React, { useEffect, useState } from "react";
import useConverter from "../../../hooks/useConverter";
import MonthlyExpenditure from "./MonthlyExpenditure/MonthlyExpenditure";

const AccountInfo: React.FC<{
  classes: ClassNameMap<string>;
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
  YEAR: string;
  MONTH: string;
  onSetView: (event: any) => void;
}> = ({
  classes,
  fName,
  lName,
  funds,
  transactions,
  onSetView,
  mobile,
  MONTH,
  YEAR,
}) => {
  const [withdrawals, setWithdrawals] = useState<number>(0);
  const [deposits, setDeposits] = useState<number>(0);
  useEffect(() => {
    let withdrawal: number = 0;
    let deposit: number = 0;
    transactions
      .filter((a) => {
        return (
          a.dateOfTransaction.substring(0, 4) === YEAR &&
          a.dateOfTransaction.substring(6, 7) === MONTH
        );
      })
      .map((a) => {
        if (
          a.type === "withdrawal" ||
          a.type === "transfer" ||
          a.type === "ACH Debit" ||
          a.type === "Debit transfer"
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
  }, [YEAR, MONTH, transactions]);

  const details: { key: number; value: string; desc: string }[] = [
    { key: 1, value: `$${useConverter(funds)}`, desc: "Available balance" },
    {
      key: 2,
      value: `+$${useConverter(deposits)}`,
      desc: "Deposits this month",
    },
    {
      key: 3,
      value: `-$${useConverter(withdrawals)}`,
      desc: "Withdrawls this month",
    },
  ];

  const links: { key: number; title: string }[] = [
    { key: 1, title: "Statement" },
    { key: 2, title: "Paperless" },
    { key: 3, title: "Transfer Money" },
    { key: 4, title: "More" },
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
            Full account numbers
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
