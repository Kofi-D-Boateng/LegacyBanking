import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { Dispatch, FC, useEffect, SetStateAction } from "react";
import { AccountType, TransactionType } from "../../../enums/ProfileEnums";
import { Account, Transaction } from "../../../types/CustomerDetails";
import MonthlyExpenditure from "./MonthlyExpenditure/MonthlyExpenditure";

const AccountInfo: FC<{
  account: Account;
  accountNumberTag: string;
  classes: {
    readonly [key: string]: string;
  };
  deposits: number;
  links: {
    key: number;
    title: string;
  }[];
  myName: string;
  transactions: Transaction[];
  withdrawals: number;
  setWithdrawals: Dispatch<SetStateAction<number>>;
  setDeposits: Dispatch<SetStateAction<number>>;
  onSetView: (event: any) => void;
}> = ({
  classes,
  myName,
  links,
  transactions,
  deposits,
  withdrawals,
  accountNumberTag,
  account,
  setDeposits,
  setWithdrawals,
  onSetView,
}) => {
  console.log(account);
  useEffect(() => {
    let withdrawl: number = 0;
    let deposit: number = 0;
    transactions.forEach((a) => {
      if (
        a.transactionType.includes(TransactionType.WITHDRAWL) ||
        (a.transactionType.includes(TransactionType.TRANSFER) &&
          !a.recipient.includes("SELF")) ||
        a.transactionType.includes(TransactionType.PURCHASE)
      ) {
        withdrawl += a.amount;
      } else {
        deposit += a.amount;
      }
    });
    const floatWithdrawal = parseFloat(withdrawl.toFixed(2));
    const floatDeposit = parseFloat(deposit.toFixed(2));
    setDeposits(floatDeposit);
    setWithdrawals(floatWithdrawal);
  }, [transactions, setDeposits, setWithdrawals]);

  const details: { key: number; value: string; desc: string }[] = [
    {
      key: 1,
      value: `${account.capital.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      desc: "Available balance",
    },
    {
      key: 2,
      value: `+${deposits.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      desc: "Deposits this month",
    },
    {
      key: 3,
      value: `-${withdrawals.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      desc: account.bankAccountType.includes(AccountType.CHECKING)
        ? "Withdrawls this month"
        : "Used credit",
    },
  ];

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography sx={{ margin: "10px 0" }} variant="h6">
          {myName}'s account |
          <Button
            sx={{
              color: "#8a2be2",
              fontSize: "1.2rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "blue",
              },
            }}
            onClick={onSetView}
            variant="text"
            id="account-numbers-btn"
          >
            {accountNumberTag}
          </Button>
        </Typography>
        <Grid sx={{ margin: "10px 0" }} container>
          <MonthlyExpenditure
            details={details}
            accountType={account.bankAccountType}
          />
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
                    color: "#8a2be2",
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
