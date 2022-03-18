import { Grid, Typography, Card, CardContent } from "@mui/material";
import { ClassNameMap } from "@mui/styles/withStyles";
import React from "react";
import { NavLink } from "react-router-dom";

const AccountDetails: React.FC<{ classes: ClassNameMap<string> }> = ({
  classes,
}) => {
  const clickableDetails: {
    key: number;
    title: string;
    link: string;
    img: string | null;
  }[] = [
    { key: 1, title: "Spending summary", link: "/", img: null },
    { key: 2, title: "Credit score", link: "/", img: null },
    { key: 3, title: "Loans", link: "/", img: null },
    { key: 4, title: "Unpaid debt", link: "/", img: null },
  ];
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">Manage your details</Typography>
        {clickableDetails.map((details) => {
          return (
            <NavLink key={details.key} to={details.link}>
              <Grid container>
                <Grid xs={2} md={2} item>
                  {details.img}
                </Grid>
                <Grid xs={10} md={10} item>
                  <Typography variant="h5">{details.title}</Typography>
                </Grid>
              </Grid>
            </NavLink>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
