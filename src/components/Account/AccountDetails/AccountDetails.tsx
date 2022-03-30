import Wallet from "@mui/icons-material/AccountBalanceWallet";
import Credit from "@mui/icons-material/Speed";
import Loan from "@mui/icons-material/CreditCard";
import Debt from "@mui/icons-material/ReportProblem";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { ClassNameMap } from "@mui/styles/withStyles";
import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";

const AccountDetails: React.FC<{
  classes: ClassNameMap<string>;
}> = ({ classes }) => {
  const clickableDetails: {
    key: number;
    title: string;
    desc: string;
    link: string;
    icon: ReactElement<any, any>;
  }[] = [
    {
      key: 1,
      title: "Spending summary",
      link: "/",
      desc: "Get insight into your spending",
      icon: <Wallet fontSize="large" sx={{ color: "purple" }} />,
    },
    {
      key: 2,
      title: "Credit score",
      link: "/",
      desc: "Check your credit score",
      icon: <Credit fontSize="large" sx={{ color: "purple" }} />,
    },
    {
      key: 3,
      title: "Loans",
      link: "/",
      desc: "See what loans you have taken",
      icon: <Loan fontSize="large" sx={{ color: "purple" }} />,
    },
    {
      key: 4,
      title: "Unpaid debt",
      link: "/",
      desc: "Check your unpaid debt",
      icon: <Debt fontSize="large" sx={{ color: "purple" }} />,
    },
  ];
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">Manage your details</Typography>
        {clickableDetails.map((details) => {
          return (
            <NavLink
              className={classes.details}
              key={details.key}
              to={details.link}
            >
              <Grid container>
                <Grid
                  sx={{ margin: "auto", textAlign: "center" }}
                  xs={1}
                  md={1}
                  item
                >
                  {details.icon}
                </Grid>
                <Grid xs={10} md={10} item>
                  <Typography sx={{ margin: "0 10px" }} variant="h5">
                    {details.title}
                  </Typography>
                  <Typography sx={{ margin: "0 10px" }} variant="body1">
                    {details.desc}
                  </Typography>
                </Grid>
                <Grid
                  sx={{ margin: "auto", textAlign: "center" }}
                  xs={1}
                  md={1}
                  item
                >
                  <ArrowForwardIos />
                </Grid>
                {details.key !== clickableDetails.length && (
                  <div
                    style={{
                      borderBottom: "0.5px solid black",
                      width: "100%",
                    }}
                  />
                )}
              </Grid>
            </NavLink>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
