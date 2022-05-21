import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

const Info: FC<{
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  info: {
    key: number;
    title: string;
    info: string;
    img: string;
  }[];
}> = ({ Grid, Typography, classes, isMobile, info }) => {
  const GRIDSX: { margin: string } = { margin: "50px 0" };
  const INFOSX: { width: string; margin: string; color: string } = {
    width: "50%",
    margin: "auto",
    color: "purple",
  };
  const TITLESX: { margin: string; width: string; color: string } = {
    margin: "15px auto",
    width: "50%",
    color: "purple",
  };
  const PHOTOHOLDERSX: { width: string; margin: string } = {
    width: "50%",
    margin: "30px auto",
  };
  return (
    <Grid className={classes.infoContainer} container>
      {info.map((i) => {
        return (
          <Grid sx={GRIDSX} key={i.key} item>
            <Grid sx={TITLESX} container>
              <Typography
                variant={!isMobile ? "h3" : "h5"}
                fontWeight={!isMobile ? "normal" : "bold"}
              >
                {i.title}
              </Typography>
            </Grid>
            <Grid sx={INFOSX} container>
              <Typography
                sx={{ fontSize: "1.3rem", margin: "15px 0" }}
                paragraph={true}
              >
                {i.info}
              </Typography>
            </Grid>
            <Grid sx={PHOTOHOLDERSX} container>
              <img className={classes.img} src={i.img} alt="economics.jpg" />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Info;
