import { Grid, Typography } from "@mui/material";

const Banner: React.FC<{
  classes: {
    readonly [key: string]: string;
  };
}> = ({ classes }) => {
  return (
    <>
      <Grid className={classes.banner} container>
        <Grid className={classes.bannerTitle} item>
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
    </>
  );
};

export default Banner;
