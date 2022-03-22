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
} from "@mui/material";
import Inactive from "@mui/icons-material/ChevronRight";
import Active from "@mui/icons-material/KeyboardArrowDown";
import { ClassNameMap } from "@mui/styles/withStyles";
import React, { useState } from "react";

const AccountActivity: React.FC<{ classes: ClassNameMap<string> }> = ({
  classes,
}) => {
  const [view, setView] = useState<React.SetStateAction<boolean>>(false);
  const [filter, setFilter] = useState<string | undefined>("");

  const activity: {
    key: number;
    date: string;
    type: string;
    amount: string;
    balance: string;
    product: string;
  }[] = [
    {
      key: 1,
      date: "March 21, 2022",
      product: "Namooo Korean Bowls",
      type: "ACH Credit",
      amount: "$12.95",
      balance: "$22,000",
    },
    {
      key: 2,
      date: "March 21, 2022",
      product: "Namooo Korean Bowls",
      type: "ACH Credit",
      amount: "$12.95",
      balance: "$22,000",
    },
    {
      key: 3,
      date: "March 21, 2022",
      product: "Namooo Korean Bowls",
      type: "ACH Credit",
      amount: "$12.95",
      balance: "$22,000",
    },
    {
      key: 4,
      date: "March 21, 2022",
      product: "Namooo Korean Bowls",
      type: "ACH Credit",
      amount: "$12.95",
      balance: "$22,000",
    },
    {
      key: 5,
      date: "March 21, 2022",
      product: "Namooo Korean Bowls",
      type: "ACH Credit",
      amount: "$12.95",
      balance: "$22,000",
    },
    {
      key: 6,
      date: "March 21, 2022",
      product: "Namooo Korean Bowls",
      type: "ACH Credit",
      amount: "$12.95",
      balance: "$22,000",
    },
    {
      key: 7,
      date: "March 21, 2022",
      product: "Namooo Korean Bowls",
      type: "ACH Credit",
      amount: "$12.95",
      balance: "$22,000",
    },
  ];
  const categories: { key: number; title: string }[] = [
    { key: 1, title: "Date" },
    { key: 2, title: "Product" },
    { key: 3, title: "Type" },
    { key: 4, title: "Amount" },
    { key: 5, title: "Balance" },
  ];

  const viewHandler = () => {
    if (view) {
      setView(false);
    } else {
      setView(true);
    }
  };

  const filterHandler = (event: SelectChangeEvent) => {
    const { value } = event.target;
    console.log(value);
    console.log(typeof value);
    setFilter(value);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container>
          <Grid sx={{ margin: "auto 0" }} xs={2} md={2} item>
            <IconButton
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
        >
          {" "}
        </div>
        <Grid container>
          <Grid
            sx={{ display: "inline-flex", padding: "10px 0" }}
            xs={12}
            md={12}
            item
          >
            <Typography sx={{ margin: "auto 10px auto 0" }} variant="h6">
              Filter By:{" "}
            </Typography>
            <FormControl sx={{ width: "30%" }} size="small" fullWidth>
              <InputLabel id="input-label">Select...</InputLabel>
              <Select
                labelId="input-label"
                value={filter}
                label="Filter"
                onChange={filterHandler}
              >
                <MenuItem value={"type"}>Type</MenuItem>
                <MenuItem value={"date"}>Date</MenuItem>
                <MenuItem value={"asc"}>Oldest to newest</MenuItem>
                <MenuItem value={"desc"}>Newest to oldest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div
          style={{
            borderBottom: "0.5px solid black",
            width: "100%",
          }}
        >
          {" "}
        </div>
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
            <Grid container>
              {activity.map((a) => {
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountActivity;
