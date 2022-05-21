import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";
const Banner: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  isMobile: boolean;
  classes: {
    readonly [key: string]: string;
  };
}> = ({ Grid, Typography, isMobile, classes }) => {
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
            Info for startups
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Banner;
