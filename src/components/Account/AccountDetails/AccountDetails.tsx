import Wallet from "@mui/icons-material/AccountBalanceWallet";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import { ChartType } from "../../../enums/Chart";

const AccountDetails: FC<{
  classes: {
    readonly [key: string]: string;
  };
  summaryURL: string;
}> = ({ classes, summaryURL }) => {
  const url = summaryURL.concat(`&chartType=${ChartType.Bar}`);
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
      link: url,
      desc: "Get insight into your spending",
      icon: <Wallet fontSize="large" sx={{ color: "#8a2be2" }} />,
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
