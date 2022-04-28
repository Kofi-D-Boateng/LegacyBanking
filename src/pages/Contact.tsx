import { Grid, Typography } from "@mui/material";
import React from "react";
import lady from "../assets/photos/ladyInChair.jpg";
import classes from "../styles/ContactStyles.module.css";

const Contact: React.FC = () => {
  return (
    <Grid className={classes.container} container>
      <Grid className={classes.gridLeft} md={6} item>
        <Typography className={classes.contactTitle} variant="h5">
          Get in contact with our representitve
        </Typography>
        <Grid className={classes.contactSocials} container>
          <Grid xs={6} md={6} item>
            <Typography variant="h6">
              Reach out to us on our social media platforms.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid md={6} item>
        <img className={classes.img} src={lady} alt="lady.jpg" />
      </Grid>
    </Grid>
  );
};

export default Contact;
