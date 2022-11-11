import { FC, memo } from "react";
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
  filterParam: string | null;
  classes: ClassNameMap<string>;
  transactions: Transaction[];
  setAccountActivityView: () => void;
  setTransactionViewCount: () => void;
  nav: NavigateFunction;
  fName: string;
  lName: string;
  year: string | null;
  month: string | null;
  activityViewIsEnabled: string | null;
  countParam: string | null;
  isMobile: boolean;
  filterType: string | null;
  filterYear: string | null;
  filterMonth: string | null;
}> = ({
  classes,
  transactions,
  nav,
  fName,
  lName,
  month,
  year,
  filterParam,
  accountParam,
  activityViewIsEnabled,
  countParam,
  isMobile,
  setAccountActivityView,
  setTransactionViewCount,
}) => {
  const count = parseInt(countParam as string);

  const categories: { key: number; title: string }[] = [
    { key: 1, title: "Date" },
    { key: 2, title: "Description" },
    { key: 3, title: "Type" },
    { key: 4, title: "Amount" },
  ];

  const filter = transactions.filter((a, index) => {
    return index <= count;
  });

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
              onClick={setAccountActivityView}
              children={activityViewIsEnabled ? <Active /> : <Inactive />}
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
                filterParam={filterParam}
                isMobile={isMobile}
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
        {activityViewIsEnabled && (
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
              transactions={filter}
              classes={classes}
              categories={categories}
              increaseCount={setTransactionViewCount}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(AccountActivity);
