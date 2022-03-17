import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import AccountActivity from "../components/Account/AccountActivity/AccountActivity";
import AccountInfo from "../components/Account/AccountCard/AccountInfo";
import AccountDetails from "../components/Account/AccountDetails/AccountDetails";

const Profile: React.FC = () => {
  return (
    <Grid
      sx={{ backgroundColor: "rgb(235, 236, 237)", padding: "10px 0" }}
      container
    >
      <Grid xs={12} lg={7} item>
        <Grid container>
          <Grid xs={12} md={12} item>
            <AccountInfo />
          </Grid>
          <Grid xs={12} md={12} item>
            <AccountActivity />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={5} item>
        <Grid container>
          <Grid xs={12} md={12} item>
            <AccountDetails />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
