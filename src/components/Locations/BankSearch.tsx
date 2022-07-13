import { Grid, Typography } from "@mui/material";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import GlobalMap from "../UI/WorldMap/GlobalMap";

const BankSearch: React.FC<{
  nav: NavigateFunction;
  bank: {
    name: string;
    country: string;
    area: string;
    zipcode: string;
    totalHoldings: number;
    branches: {
      name: string;
      country: string;
      state: string;
      zipcode: string;
      totalHoldings: number;
      latitude: number;
      longitude: number;
    }[];
  };
  classes: {
    readonly [key: string]: string;
  };
  param: URLSearchParams;
}> = ({ bank, classes, nav, param }) => {
  return (
    <Grid id="map" sx={{ padding: "10px 0" }} container>
      <Grid sx={{ textAlign: "center" }} xs={12} md={12} item>
        <Typography variant="h4" sx={{ color: "purple" }}>
          View our locations around the world
        </Typography>
      </Grid>
      <div className={classes.mapContainer}>
        <GlobalMap
          classes={classes}
          branch={bank.branches}
          nav={nav}
          param={param}
        />
      </div>
    </Grid>
  );
};

export default BankSearch;
