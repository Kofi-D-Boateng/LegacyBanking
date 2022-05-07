import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, Fragment } from "react";

const Leadership: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  LEADERSHIP: {
    key: number;
    name: string;
    position: string;
    bio: string;
  }[];
  classes: {
    readonly [key: string]: string;
  };
  photo: string;
  isMobile: boolean;
}> = ({ Grid, LEADERSHIP, Typography, classes, photo, isMobile }) => {
  const SX: { margin: string; width: string; textAlign: string } = {
    margin: "10px 0",
    width: "80%",
    textAlign: "center",
  };

  return (
    <>
      <Grid className={classes.leadershipContainer} container>
        {LEADERSHIP.map((L) => {
          return (
            <Fragment key={L.key}>
              <Grid
                sx={{ textAlign: "center", margin: "30px 0" }}
                xs={12}
                md={6}
                item
              >
                <img src={photo} className={classes.img} alt="headshot.jpg" />
              </Grid>
              {isMobile ? (
                <Grid
                  sx={!isMobile ? { textAlign: "left", margin: "auto" } : SX}
                  xs={12}
                  md={6}
                  item
                >
                  <Grid sx={isMobile && { justifyContent: "center" }} container>
                    <Typography
                      className={!isMobile ? classes.leadershipInfo : ""}
                      variant="h5"
                    >
                      {L.name}
                    </Typography>
                  </Grid>
                  <Grid sx={isMobile && { justifyContent: "center" }} container>
                    <Typography className={classes.leadershipInfo} variant="h5">
                      {L.position}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Typography
                      className={classes.leadershipInfo}
                      variant="body1"
                    >
                      {L.bio}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  sx={{ textAlign: "left", margin: "auto" }}
                  xs={12}
                  md={6}
                  item
                >
                  <Grid container>
                    <Typography className={classes.leadershipInfo} variant="h5">
                      {L.name}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Typography className={classes.leadershipInfo} variant="h5">
                      {L.position}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Typography
                      className={classes.leadershipInfo}
                      variant="body1"
                    >
                      {L.bio}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default Leadership;
