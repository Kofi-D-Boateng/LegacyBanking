import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { BankDetails } from "../../types/Bank";
import GlobalMap from "../UI/WorldMap/GlobalMap";

const BankSearch: FC<{
  bank: BankDetails;
  classes: {
    readonly [key: string]: string;
  };
}> = ({ bank, classes }) => {
  return (
    <Grid id="map" sx={{ padding: "10px 0" }} container>
      <Grid sx={{ textAlign: "center" }} xs={12} md={12} item>
        <Typography variant="h4" sx={{ color: "purple" }}>
          View our locations around the world
        </Typography>
      </Grid>
      <div className={classes.mapContainer}>
        <GlobalMap classes={classes} branch={bank.branches} />
      </div>
    </Grid>
  );
};

export default BankSearch;
