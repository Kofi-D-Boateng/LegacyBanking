import { ClassNameMap, Grid, Typography } from "@mui/material";
import React from "react";

const Transaction: React.FC<{
  classes: ClassNameMap<string>;
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  categories: {
    key: number;
    title: string;
  }[];
  filter: string | undefined;
  YEAR: string;
  MONTH: string;
}> = ({ classes, categories, filter, transactions, MONTH, YEAR }) => {
  console.log(transactions);

  return (
    <Grid container>
      {transactions
        .filter((a) => {
          return (
            a.dateOfTransaction.substring(0, 4) === YEAR &&
            a.dateOfTransaction.substring(6, 7) === MONTH
          );
        })
        .map((a) => {
          return (
            <Grid key={a.id} className={classes.activities} container>
              <Grid
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography variant="body1">{a.dateOfTransaction}</Typography>
              </Grid>
              <Grid
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography variant="body1">{a.location}</Typography>
              </Grid>
              <Grid
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography variant="body1">{a.type}</Typography>
              </Grid>
              <Grid
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography variant="body1">
                  {a.type === "transfer" ||
                  a.type === "withdrawal" ||
                  a.type === "ACH Debit"
                    ? `-$${a.amount}`
                    : `+$${a.amount}`}
                </Typography>
              </Grid>
              <div
                style={{
                  borderBottom: "0.5px solid black",
                  width: "100%",
                }}
              >
                {" "}
              </div>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Transaction;
