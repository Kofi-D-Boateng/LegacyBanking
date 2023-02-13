import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import lc from "../../../assets/photos/little-cesears.png"
import dm from "../../../assets/photos/dominos.png"
import pb from "../../../assets/photos/Panera-Bread.png"
import wx from "../../../assets/photos/wix.jpg"

const AccountCoupons: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ classes, isMobile }) => {
  const coupons: {
    key: number;
    title: string;
    amount: string;
    daysLeft: string;
    img:string;
  }[] = [
    {
      key: 1,
      title: "Dominos pizza",
      amount: `${10}% off`,
      daysLeft: `${2} days left`,
      img:dm
    },
    {
      key: 2,
      title: "Little Ceasars pizza",
      amount: `${10}% off`,
      daysLeft: `${3} days left`,
      img:lc
    },
    {
      key: 3,
      title: "Panera Bread",
      amount: `${10}% off`,
      daysLeft: `${10} days left`,
      img:pb
    },
    {
      key: 4,
      title: "Wix",
      amount: `${10}% off`,
      daysLeft: `${20} days left`,
      img:wx
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
                    width: isMobile ? "90%" : "70%",
                    minHeight: "150px",
                    position: "relative",
                    border: "0.5px solid lightgray",
                  }}
                >
                  <Grid className={classes.couponTextContainer} container>
                  <Grid xs={12} md={12} sx={{zIndex:1}} item>
                    <Typography variant="body1" sx={{zIndex:1}}>{c.title}</Typography>
                  </Grid>
                  <Grid xs={12} md={12} sx={{zIndex:1}} item>
                    <Typography variant="body1" sx={{zIndex:1}}>{c.amount}</Typography>
                  </Grid>
                  </Grid>
                  <Grid xs={12} md={12} sx={{position:"absolute",bottom: "0", width: "100%"}} item>
                  <img src={c.img} className={classes.couponImgs} alt={`${c.title}.png`}/>
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
