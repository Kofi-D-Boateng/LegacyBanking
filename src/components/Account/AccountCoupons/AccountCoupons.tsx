import {
  Card,
  CardContent,
  ClassNameMap,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const AccountCoupons: React.FC<{ classes: ClassNameMap<string> }> = ({
  classes,
}) => {
  const coupons: {
    key: number;
    title: string;
    amount: string;
    daysLeft: string;
  }[] = [
    {
      key: 1,
      title: "Dominos pizza",
      amount: `${10}% off`,
      daysLeft: `${2} days left`,
    },
    {
      key: 2,
      title: "Little Ceasars pizza",
      amount: `${10}% off`,
      daysLeft: `${3} days left`,
    },
    {
      key: 3,
      title: "Panera Bread",
      amount: `${10}% off`,
      daysLeft: `${10} days left`,
    },
    {
      key: 4,
      title: "Wix",
      amount: `${10}% off`,
      daysLeft: `${20} days left`,
    },
  ];

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">Get Cash back on purchases</Typography>
        <Grid container>
          {coupons.map((c) => {
            return (
              <Grid
                key={c.key}
                xs={12 / coupons.length}
                md={12 / coupons.length}
                item
              >
                <Paper
                  sx={{
                    margin: "30px auto",
                    textAlign: "center",
                    width: "70%",
                    minHeight: "150px",
                    position: "relative",
                    border: "0.5px solid lightgray",
                  }}
                >
                  <Grid xs={12} md={12} item>
                    <Typography variant="h6">{c.title}</Typography>
                  </Grid>
                  <Grid xs={12} md={12} item>
                    <Typography variant="body1">{c.amount}</Typography>
                  </Grid>
                  <Grid
                    sx={{
                      backgroundColor: "lightgray",
                      position: "absolute",
                      bottom: "0",
                      width: "100%",
                    }}
                    xs={12}
                    md={12}
                    item
                  >
                    <Typography variant="body1">{c.daysLeft}</Typography>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountCoupons;
