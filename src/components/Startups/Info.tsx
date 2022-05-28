import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const Info: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  classes: {
    readonly [key: string]: string;
  };
  INFO: {
    key: number;
    title: string;
    info: string;
    img: string;
  }[];
}> = ({ Grid, Typography, classes, INFO }) => {
  const TEXTSX: { margin: string } = { margin: "auto" };
  return (
    <>
      <Grid className={classes.infoContainer} container>
        {INFO.map((i) => {
          if (i.key % 2 !== 0) {
            return (
              <Grid className={classes.infoBox} key={i.key} container>
                <Grid sx={TEXTSX} xs={12} md={6} item>
                  <Typography variant="h4">{i.title}</Typography>
                  <Typography paragraph={true} sx={{ fontSize: "1.3rem" }}>
                    {i.info}
                  </Typography>
                </Grid>
                <Grid xs={12} md={6} item>
                  <img className={classes.img} src={i.img} alt="img.jpg" />
                </Grid>
              </Grid>
            );
          } else {
            return (
              <Grid className={classes.infoBox} key={i.key} container>
                <Grid xs={12} md={6} item>
                  <img className={classes.img} src={i.img} alt="img.jpg" />
                </Grid>
                <Grid sx={TEXTSX} xs={12} md={6} item>
                  <Typography variant="h4">{i.title}</Typography>
                  <Typography paragraph={true} sx={{ fontSize: "1.3rem" }}>
                    {i.info}
                  </Typography>
                </Grid>
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
};

export default Info;
