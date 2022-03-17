import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import AccountActivity from "../components/Account/AccountActivity/AccountActivity";
import AccountInfo from "../components/Account/AccountCard/AccountInfo";
import AccountDetails from "../components/Account/AccountDetails/AccountDetails";

const styles = makeStyles(() => ({
  card: {
    width: "90%",
    margin: "20px auto",
  },
}));

const Profile: React.FC = () => {
  const classes = styles();
  return (
    <Grid
      sx={{ backgroundColor: "rgb(235, 236, 237)", padding: "10px 0" }}
      container
    >
      <Grid xs={12} lg={7} item>
        <Grid container>
          <Grid xs={12} md={12} item>
            <AccountInfo classes={classes} />
          </Grid>
          <Grid xs={12} md={12} item>
            <AccountActivity classes={classes} />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={5} item>
        <Grid container>
          <Grid xs={12} md={12} item>
            <AccountDetails classes={classes} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
