import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { ClassNameMap } from "@mui/styles/withStyles";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useConverter from "../../../hooks/useConverter";

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
}> = ({ classes, fName, lName, funds, transactions }) => {
  const [withdrawals, setWithdrawals] = useState<number>(0);
  const [deposits, setDeposits] = useState<number>(0);
  const currentMonth: string = (new Date().getMonth() + 1).toString();
  const currentYear: string = new Date().getFullYear().toString();

  useEffect(() => {
    let withdrawal: number = 0;
    let deposit: number = 0;
    transactions
      .filter((a) => {
        return (
          a.dateOfTransaction.substring(0, 4) === currentYear &&
          a.dateOfTransaction.substring(6, 7) === currentMonth
        );
      })
      .map((a) => {
        console.log(a);
        if (a.type === "withdrawal") {
          withdrawal = withdrawal + a.amount;
        } else {
          console.log("made it");
          deposit++;
          console.log(deposit);
        }
        if (a.id === transactions.length) {
          setDeposits(deposit);
          setWithdrawals(withdrawal);
        }
        return;
      });
  }, [currentMonth, currentYear, transactions]);

  const details: { key: number; value: string | undefined; desc: string }[] = [
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

  const links: { key: number; title: string; link: string }[] = [
    { key: 1, title: "Statement", link: "/" },
    { key: 2, title: "Paperless", link: "/" },
    { key: 3, title: "Transfer Money", link: "/" },
    { key: 4, title: "More", link: "/" },
  ];
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography sx={{ margin: "10px 0" }} variant="h6">
          {fName} {lName}'s account |{" "}
          <Button sx={{ color: "blue" }} variant="text">
            See full account number
          </Button>
        </Typography>
        <Grid sx={{ margin: "10px 0" }} container>
          {details.map((d) => {
            return (
              <Grid key={d.key} md={4} item>
                <Grid container>
                  <Grid xs={12} md={12} item>
                    <Typography variant="h6">{d.value}</Typography>
                  </Grid>
                  <Grid xs={12} md={12} item>
                    <Typography variant="body1">{d.desc}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <hr style={{ backgroundColor: "black", padding: "0.5px 0" }} />
        <Grid container>
          {links.map((l) => {
            return (
              <Grid
                key={l.key}
                className={l.key !== 4 ? classes.linksContainer : ""}
                sx={l.key === 4 ? { textAlign: "center" } : null}
                xs={12 / links.length}
                md={12 / links.length}
                item
              >
                <NavLink className={classes.links} to={l.link}>
                  {l.title}
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
