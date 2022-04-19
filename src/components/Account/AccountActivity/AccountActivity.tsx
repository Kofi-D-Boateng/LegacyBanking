import React, { ChangeEvent, useCallback, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
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
  MONTH: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
}> = ({ classes, transactions, MONTH, YEAR, setCurrentMonth }) => {
  const [view, setView] = useState<React.SetStateAction<boolean>>(false);
  const [filter, setFilter] = useState<string | undefined>("");

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

  const activityHandler: (e: ChangeEvent) => void = () => {};

  const filterHandler = useCallback((event: SelectChangeEvent) => {
    const { value } = event.target;
    console.log(value);
    console.log(typeof value);
    setFilter(value);
  }, []);

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
              setCurrentMonth={setCurrentMonth}
              transactions={transactions}
              classes={classes}
              filter={filter}
              categories={categories}
              YEAR={YEAR}
              MONTH={MONTH}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(AccountActivity);
