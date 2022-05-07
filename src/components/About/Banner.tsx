import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const Banner: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
}> = ({ classes, isMobile, Grid, Typography }) => {
  return (
    <>
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
            About us
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Banner;
