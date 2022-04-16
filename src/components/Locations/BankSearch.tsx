import { Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
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
  param: {
    state: string | undefined;
    zipcode: string | undefined;
    country: string | undefined;
  };
  onParam: React.Dispatch<
    React.SetStateAction<{
      state: string | undefined;
      zipcode: string | undefined;
      country: string | undefined;
    }>
  >;
  location: (e: React.MouseEvent<HTMLImageElement>) => void;
  Geolocation: Geolocation[];
}> = ({ bank, onParam, param, location, Geolocation }) => {
  return (
    <Grid container>
      <Typography variant="h4" sx={{ margin: "auto", color: "purple" }}>
        Regional Locations
      </Typography>
      <div style={{ width: "100%", margin: "50px auto" }}>
        <GlobalMap Geolocation={Geolocation} branch={bank.branches} />
      </div>
    </Grid>
  );
};

export default BankSearch;
