import { GridTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, ReactElement } from "react";

const ContactInfo: FC<{
  CM: {
    key: number;
    title: string;
    img: string;
    btn: ReactElement;
    classes: string;
    imgCss: string;
  }[];
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  classes: {
    readonly [key: string]: string;
  };
  isMobile: boolean;
}> = ({ CM, Grid, classes, isMobile }) => {
  return (
    <Grid
      className={!isMobile ? classes.container : ""}
      sx={isMobile ? { width: "90%", margin: "auto", color: "black" } : null}
      container
    >
      {CM.map((c) => {
        return (
          <Grid key={c.key} className={c.classes} xs={12} md={CM.length} item>
            <Grid sx={{ textAlign: "center" }} container>
              <Typography variant="h4">{c.title}</Typography>
            </Grid>
            <Grid container>
              <img className={c.imgCss} src={c.img} alt="contact.jpg" />
            </Grid>
            <Grid container>{c.btn}</Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ContactInfo;
