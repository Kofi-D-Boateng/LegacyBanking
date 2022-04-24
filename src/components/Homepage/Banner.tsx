import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { NavigateFunction } from "react-router-dom";

const Banner: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
  cityscape: any;
  isMobile: boolean;
  navigate: NavigateFunction;
}> = ({ classes, cityscape, isMobile, navigate }) => {
  return (
    <Grid className={classes.banner} container>
      <Grid className={classes.sloganContainer} container>
        <Grid className={classes.slogan} xs={12} md={12} lg={6} item>
          <Typography variant="h3">Leagacy Investments</Typography>
          <Typography variant="h5">
            Banking and Investing for the future in you.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              maxWidth: "0 auto",
              margin: "10px 0",
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderColor: "white",
              },
            }}
            onClick={() => navigate("/locations", { replace: true })}
          >
            Find A Location
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.videoContainer} container>
        <Grid className={classes.vidOverlay} container />
        {!isMobile ? (
          <video autoPlay muted loop>
            <source
              style={{ width: "100%", height: "auto" }}
              src={cityscape}
              type="video/mp4"
            />
          </video>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Banner;
