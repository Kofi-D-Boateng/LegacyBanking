import { Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { TransactionType } from "../../../enums/ProfileEnums";
import { Transaction } from "../../../types/CustomerDetails";
const Transactions: FC<{
  classes: {
    readonly [key: string]: string;
  };
  transactions: Transaction[];
  categories: {
    key: number;
    title: string;
  }[];
  increaseCount: () => void;
}> = ({ classes, categories, transactions, increaseCount }) => {
  return (
    <Grid sx={{ margin: "auto" }} container>
      {transactions.map((a) => {
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
                {a.transactionType.includes(TransactionType.TRANSFER) ||
                a.transactionType.includes(TransactionType.WITHDRAWL)
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
            color: "#8a2be2",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          type="button"
          variant="text"
          onClick={increaseCount}
        >
          See more activity
        </Button>
      </Grid>
    </Grid>
  );
};

export default Transactions;
