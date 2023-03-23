import { Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { NavigateFunction } from "react-router-dom";
import { API_VERSION } from "../UI/Constants/Constants";

const Banner: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  navigate: NavigateFunction;
}> = ({ classes, isMobile, navigate }) => {
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
              transitionDuration: "500ms",
              transitionProperty: "background, color",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderColor: "white",
              },
            }}
            onClick={() => navigate("/locations", { replace: false })}
          >
            Find A Location
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.videoContainer} container>
        <Grid className={classes.vidOverlay} container />
        {!isMobile && (
          <video autoPlay muted loop>
            <source
              style={{ width: "100%", height: "auto" }}
              src={`${API_VERSION}/s3/get-video?key=cityscape.mp4`}
              type="video/mp4"
            />
          </video>
        )}
      </Grid>
    </Grid>
  );
};

export default Banner;
