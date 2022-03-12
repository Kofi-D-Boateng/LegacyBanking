import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const styles = makeStyles(() => ({
  footer: {
    backgroundColor: "rgb(235, 236, 237)",
    textAlign: "center",
  },
  date: {
    color: "blue",
  },
  footerLink: {
    color: "black",
  },
}));

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const classes = styles();
  return (
    <footer className={classes.footer}>
      <Grid container>
        <Grid xs={2} md={2} item>
          <Typography className={classes.date} variant="h4">
            Legacy tm {year}
          </Typography>
        </Grid>
        <Grid className={classes.footerLink} xs={5} md={5} item>
          <Typography variant="h5">Hello</Typography>
        </Grid>
        <Grid className={classes.footerLink} xs={5} md={5} item>
          <Typography variant="h5">Hello</Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
