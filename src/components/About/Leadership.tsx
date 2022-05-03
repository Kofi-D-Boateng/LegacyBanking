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
}> = ({ Grid, LEADERSHIP, Typography, classes, photo }) => {
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
                <img src={photo} className={classes.img} />
              </Grid>
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
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default Leadership;
