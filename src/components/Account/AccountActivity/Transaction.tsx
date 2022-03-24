import { ClassNameMap, Grid, Typography } from "@mui/material";
import React from "react";

const Transaction: React.FC<{
  classes: ClassNameMap<string>;
  activity: {
    key: number;
    date: string;
    type: string;
    amount: string;
    balance: string;
    product: string;
  }[];
  categories: {
    key: number;
    title: string;
  }[];
  filter: string | undefined;
}> = ({ classes, activity, categories, filter }) => {
  //   const alphabet = {
  //     A: 1,
  //     B: 2,
  //     C: 3,
  //     D: 4,
  //     E: 5,
  //     F: 6,
  //     G: 7,
  //     H: 8,
  //     I: 9,
  //     J: 10,
  //     K: 11,
  //     L: 12,
  //     M: 13,
  //     N: 14,
  //     O: 15,
  //     P: 16,
  //     Q: 17,
  //     R: 18,
  //     S: 19,
  //     T: 20,
  //     U: 21,
  //     V: 22,
  //     W: 23,
  //     X: 24,
  //     Y: 25,
  //     Z: 26,
  //   };
  //   const month = {
  //     Jan: 1,
  //     Feb: 2,
  //     Mar: 3,
  //     Apr: 4,
  //     May: 5,
  //     Jun: 6,
  //     Jul: 7,
  //     Aug: 8,
  //     Sep: 9,
  //     Oct: 10,
  //     Nov: 11,
  //     Dec: 12,
  //   };
  console.log(activity.reverse());
  console.log(activity);
  return (
    <Grid container>
      {filter === "asc"
        ? activity.reverse().map((a) => {
            return (
              <Grid key={a.key} className={classes.activities} container>
                <Grid
                  xs={12 / categories.length}
                  md={12 / categories.length}
                  item
                >
                  <Typography variant="body1">{a.date}</Typography>
                </Grid>
                <Grid
                  xs={12 / categories.length}
                  md={12 / categories.length}
                  item
                >
                  <Typography variant="body1">{a.product}</Typography>
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
                  <Typography variant="body1">{a.amount}</Typography>
                </Grid>
                <Grid
                  xs={12 / categories.length}
                  md={12 / categories.length}
                  item
                >
                  <Typography variant="body1">{a.balance}</Typography>
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
          })
        : activity.map((a) => {
            return (
              <Grid key={a.key} className={classes.activities} container>
                <Grid
                  xs={12 / categories.length}
                  md={12 / categories.length}
                  item
                >
                  <Typography variant="body1">{a.date}</Typography>
                </Grid>
                <Grid
                  xs={12 / categories.length}
                  md={12 / categories.length}
                  item
                >
                  <Typography variant="body1">{a.product}</Typography>
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
                  <Typography variant="body1">{a.amount}</Typography>
                </Grid>
                <Grid
                  xs={12 / categories.length}
                  md={12 / categories.length}
                  item
                >
                  <Typography variant="body1">{a.balance}</Typography>
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
