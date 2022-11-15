import { Grid, Typography } from "@mui/material";
import { FC } from "react";

const Banner: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ classes, isMobile }) => {
  return (
    <Grid
      className={!isMobile ? classes.banner : classes.mobileBanner}
      container
    >
      <Grid
        className={classes.bannerTitle}
        sx={{ margin: "auto", padding: "10px", width: "60%" }}
        item
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
          }}
        >
          Our Locations
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Banner;
