import { FC, memo, SetStateAction, useState } from "react";
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
import Transactions from "./Transactions";
import { Transaction } from "../../../types/CustomerDetails";
import Options from "./Options";
import { NavigateFunction } from "react-router-dom";

const AccountActivity: FC<{
  accountParam: string | null;
  classes: ClassNameMap<string>;
  transactions: Transaction[];
  nav: NavigateFunction;
  fName: string;
  lName: string;
  year: string | null;
  month: string | null;
}> = ({
  classes,
  transactions,
  nav,
  fName,
  lName,
  month,
  year,
  accountParam,
}) => {
  const [view, setView] = useState<SetStateAction<boolean>>(false);
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
          <Grid sx={{ margin: "auto 0" }} xs={1} md={1} item>
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
          <Grid sx={{ margin: "auto" }} xs={3} md={3} item>
            <Typography sx={{ float: "left" }} variant="h6">
              Account Activity
            </Typography>
          </Grid>
          <Grid sx={{ margin: "auto" }} sm={8} md={8} item>
            <Grid container>
              <Options
                accountParam={accountParam}
                nav={nav}
                fName={fName}
                lName={lName}
                year={year}
                month={month}
              />
            </Grid>
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
            <Transactions
              transactions={transactions}
              classes={classes}
              categories={categories}
              count={count}
              setCount={setCount}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(AccountActivity);
