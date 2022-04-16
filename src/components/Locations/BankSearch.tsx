import { Grid, Typography } from "@mui/material";
import React from "react";
import { Geolocation } from "../../Interfaces/Maps";
import GlobalMap from "../UI/WorldMap/GlobalMap";

const BankSearch: React.FC<{
  bank: {
    name: string;
    country: string;
    area: string;
    zipcode: string;
    totalHoldings: number;
    branches: {
      name: string;
      country: string;
      area: string;
      zipcode: string;
      totalHoldings: number;
    }[];
  };
  classes: {
    readonly [key: string]: string;
  };
  Geolocation: Geolocation[];
}> = ({ bank, Geolocation, classes }) => {
  return (
    <Grid sx={{ padding: "30px 0" }} container>
      <Grid sx={{ textAlign: "center" }} xs={12} md={12} item>
        <Typography variant="h4" sx={{ color: "purple" }}>
          View our locations around the world
        </Typography>
      </Grid>
      <div className={classes.mapContainer}>
        <GlobalMap
          classes={classes}
          Geolocation={Geolocation}
          branch={bank.branches}
        />
      </div>
    </Grid>
  );
};

export default BankSearch;
