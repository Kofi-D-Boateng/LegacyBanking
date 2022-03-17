import { Grid, Typography, Card, CardContent } from "@mui/material";
import React from "react";

const AccountInfo: React.FC = () => {
  return (
    <Card style={{ width: "90%", margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h6">User Account</Typography>
        <Grid container>
          <Grid md={4} item>
            <Grid container>
              <Grid xs={12} md={12} item>
                $520,000
              </Grid>
              <Grid xs={12} md={12} item>
                <Typography variant="body2">Available balance</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid md={4} item>
            <Grid container>
              <Grid xs={12} md={12} item>
                +$20,000
              </Grid>
              <Grid xs={12} md={12} item>
                <Typography variant="body2">Deposits this month</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid md={4} item>
            <Grid container>
              <Grid xs={12} md={12} item>
                -$6,000
              </Grid>
              <Grid xs={12} md={12} item>
                <Typography variant="body2">Withdrawls this month</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
