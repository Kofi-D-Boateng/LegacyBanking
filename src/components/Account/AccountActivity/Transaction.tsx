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
}> = ({ classes, categories, filter, transactions }) => {
  console.log(transactions);

  return (
    <Grid container>
      {filter === "asc"
        ? transactions.map((a) => {
            if (
              a.type === "withdrawal" ||
              a.type === "account transfer" ||
              a.type === "ACH Debit"
            ) {
              return (
                <Grid key={a.id} className={classes.activities} container>
                  <Grid
                    xs={12 / categories.length}
                    md={12 / categories.length}
                    item
                  >
                    <Typography variant="body1">
                      {a.dateOfTransaction}
                    </Typography>
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
                    <Typography variant="body1">{`-$${a.amount}`}</Typography>
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
            } else {
              return (
                <Grid key={a.id} className={classes.activities} container>
                  <Grid
                    xs={12 / categories.length}
                    md={12 / categories.length}
                    item
                  >
                    <Typography variant="body1">
                      {a.dateOfTransaction}
                    </Typography>
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
                    <Typography variant="body1">{`+$${a.amount}`}</Typography>
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
            }
          })
        : transactions.map((a) => {
            if (
              a.type === "withdrawal" ||
              a.type === "account transfer" ||
              a.type === "ACH Debit"
            ) {
              return (
                <Grid key={a.id} className={classes.activities} container>
                  <Grid
                    xs={12 / categories.length}
                    md={12 / categories.length}
                    item
                  >
                    <Typography variant="body1">
                      {a.dateOfTransaction}
                    </Typography>
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
                    <Typography variant="body1">{`-$${a.amount}`}</Typography>
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
            } else {
              return (
                <Grid key={a.id} className={classes.activities} container>
                  <Grid
                    xs={12 / categories.length}
                    md={12 / categories.length}
                    item
                  >
                    <Typography variant="body1">
                      {a.dateOfTransaction}
                    </Typography>
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
                    <Typography variant="body1">{`+$${a.amount}`}</Typography>
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
            }
          })}
    </Grid>
  );
};

export default Transaction;
