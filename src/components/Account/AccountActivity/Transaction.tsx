import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import {
  ACHDEBIT,
  DEBITTRASFER,
  TRANSFER,
  WITHDRAWAL,
} from "../../UI/Constants/Constants";

const Transaction: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
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
  YEAR: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ classes, categories, transactions, YEAR, count, setCount }) => {
  return (
    <Grid sx={{ margin: "auto" }} container>
      {transactions
        .filter((a, index) => {
          return (
            +a.dateOfTransaction.substring(0, 4) === YEAR && index <= count
          );
        })
        .map((a) => {
          return (
            <Grid key={a.id} className={classes.activities} container>
              <Grid
                sx={{ margin: "auto" }}
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography variant="body1">{a.dateOfTransaction}</Typography>
              </Grid>
              <Grid
                sx={{ margin: "auto" }}
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography variant="body1">{a.location}</Typography>
              </Grid>
              <Grid
                sx={{ margin: "auto" }}
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography variant="body1">{a.type}</Typography>
              </Grid>
              <Grid
                sx={{ margin: "auto" }}
                xs={12 / categories.length}
                md={12 / categories.length}
                item
              >
                <Typography sx={{ fontWeight: "bold" }} variant="body1">
                  {a.type.includes(DEBITTRASFER) ||
                  a.type.includes(TRANSFER) ||
                  a.type.includes(WITHDRAWAL) ||
                  a.type.includes(ACHDEBIT)
                    ? `-${a.amount.toLocaleString("en-us", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : `+${a.amount.toLocaleString("en-us", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
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
      <Grid sx={{ marginTop: "10px" }} container>
        <Button
          sx={{
            margin: "auto",
            color: "purple",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          type="button"
          variant="text"
          // THIS DOES NOT WORK AS INTENDED!!! MUST DECREMENT CURRENT TO SHOW PREVIOUS MONTHS.
          onClick={() => {
            setCount((prevState) => prevState + 5);
          }}
        >
          See more activity
        </Button>
      </Grid>
    </Grid>
  );
};

export default Transaction;
