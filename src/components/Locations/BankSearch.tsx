import React, { useRef, useState } from "react";
import { LocationMap } from "../../Interfaces/Maps";
import WorldMap from "../UI/SVGs/WorldMap";

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
  Map: string;
}> = ({ bank, onParam, param, location, Map }) => {
  const COORDINATES: LocationMap[] = [];

  return <WorldMap location={location} Map={Map} bank={bank} />;
};

export default BankSearch;
