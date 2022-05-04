import { GridTypeMap, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";
const Partners: FC<{
  Grid: OverridableComponent<GridTypeMap<{}, "div">>;
  Typography: OverridableComponent<TypographyTypeMap<{}, "span">>;
  classes: {
    readonly [key: string]: string;
  };
  PARTNERS: {
    key: number;
    img: string;
  }[];
}> = ({ Grid, PARTNERS, Typography, classes }) => {
  const PARTNERIMG: { width: string } = { width: "40%" };
  return (
    <>
      <Grid className={classes.title} container>
        <Typography variant="h5">Our current partners</Typography>
      </Grid>
      <Grid className={classes.partnerContainer} container>
        {PARTNERS.map((p) => {
          return (
            <Grid
              sx={{ margin: "auto", textAlign: "center" }}
              xs={6}
              md={12 / PARTNERS.length}
              key={p.key}
              item
            >
              <img style={PARTNERIMG} src={p.img} alt="partner.jpg" />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Partners;
