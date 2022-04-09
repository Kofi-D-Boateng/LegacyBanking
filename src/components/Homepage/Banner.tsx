import { Button, ClassNameMap, Grid, Typography } from "@mui/material";
import React from "react";

const Banner: React.FC<{
  classes: ClassNameMap<string>;
  cityscape: any;
  isMobile: boolean;
}> = ({ classes, cityscape, isMobile }) => {
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
          >
            Find A Location
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.videoContainer} container>
        <Grid className={classes.vidOverlay} container />
        <video autoPlay muted loop>
          <source
            style={{ objectFit: "cover" }}
            src={cityscape}
            type="video/mp4"
          />
        </video>
      </Grid>
    </Grid>
  );
};

export default Banner;
