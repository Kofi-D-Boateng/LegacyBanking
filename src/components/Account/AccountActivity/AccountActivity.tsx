import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  ClassNameMap,
} from "@mui/material";
import Inactive from "@mui/icons-material/ChevronRight";
import Active from "@mui/icons-material/KeyboardArrowDown";
import Transaction from "./Transaction";

const AccountActivity: React.FC<{
  classes: ClassNameMap<string>;
  transactions: {
    id: number;
    type: string;
    dateOfTransaction: string;
    amount: number;
    location: string;
  }[];
  YEAR: number;
}> = ({ classes, transactions, YEAR }) => {
  const [view, setView] = useState<React.SetStateAction<boolean>>(false);
  const [count, setCount] = useState<number>(10);

  const categories: { key: number; title: string }[] = [
    { key: 1, title: "Date" },
    { key: 2, title: "Description" },
    { key: 3, title: "Type" },
    { key: 4, title: "Amount" },
  ];

  const viewHandler = () => {
    if (view) {
      setView(false);
    } else {
      setView(true);
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container>
          <Grid sx={{ margin: "auto 0" }} xs={2} md={2} item>
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={viewHandler}
              children={view ? <Active /> : <Inactive />}
            />
          </Grid>
          <Grid sx={{ margin: "auto 0" }} xs={10} md={9} item>
            <Typography sx={{ float: "left" }} variant="h6">
              Account Activity
            </Typography>
          </Grid>
        </Grid>
        <div
          style={{
            borderBottom: "0.5px solid black",
            width: "100%",
          }}
        ></div>
        {view && (
          <>
            <Grid className={classes.activityTitles} container>
              {categories.map((cat) => {
                return (
                  <Grid
                    key={cat.key}
                    xs={12 / categories.length}
                    md={12 / categories.length}
                    item
                  >
                    <Typography variant="body1">{cat.title}</Typography>
                  </Grid>
                );
              })}
            </Grid>
            <div style={{ borderBottom: "0.5px solid black", width: "100%" }}>
              {" "}
            </div>
            <Transaction
              transactions={transactions}
              classes={classes}
              categories={categories}
              YEAR={YEAR}
              count={count}
              setCount={setCount}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(AccountActivity);
