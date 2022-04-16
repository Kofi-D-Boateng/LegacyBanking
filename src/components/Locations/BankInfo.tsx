import { Grid, Typography } from "@mui/material";
import React from "react";

const BankInfo: React.FC<{}> = () => {
  return (
    <>
      <Grid sx={{ padding: "200px 0", textAlign: "center" }} container>
        <Grid xs={12} md={12} item>
          <Grid sx={{ margin: "auto" }} xs={12} md={12} item>
            <Typography variant="h3" sx={{ color: "purple" }}>
              Banking with Legacy
            </Typography>
          </Grid>
          <Grid sx={{ margin: "auto", width: "90%" }} xs={6} md={6} item>
            <Typography
              variant="body1"
              sx={{ color: "purple", fontSize: "1.3rem" }}
            >
              Legacy has many strategical positions around the world. Our goal
              is to aid give strategical advise and opportunities to our global
              community.
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={12} md={12} item></Grid>
      </Grid>
    </>
  );
};

export default BankInfo;
