import { Button, Grid, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Transaction } from "../../../types/CustomerDetails";
import {
  DEBITTRASFER,
  TRANSFER,
  WITHDRAWAL,
} from "../../UI/Constants/Constants";

const Transactions: FC<{
  classes: {
    readonly [key: string]: string;
  };
  transactions: Transaction[];
  categories: {
    key: number;
    title: string;
  }[];
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}> = ({ classes, categories, transactions, count, setCount }) => {
  const renderHandler = useCallback(() => {
    if (count > transactions.length) {
      setCount(10);
    } else {
      setCount((prevState) => prevState + 5);
    }
  }, [count, setCount, transactions.length]);
  const filter = transactions.filter((a, index) => {
    return index <= count;
  });
  return (
    <Grid sx={{ margin: "auto" }} container>
      {filter.map((a) => {
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
              <Typography variant="body1">{a.transactionType}</Typography>
            </Grid>
            <Grid
              sx={{ margin: "auto" }}
              xs={12 / categories.length}
              md={12 / categories.length}
              item
            >
              <Typography sx={{ fontWeight: "bold" }} variant="body1">
                {a.transactionType.includes(DEBITTRASFER) ||
                a.transactionType.includes(TRANSFER) ||
                a.transactionType.includes(WITHDRAWAL)
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
          onClick={renderHandler}
        >
          See more activity
        </Button>
      </Grid>
    </Grid>
  );
};

export default Transactions;
