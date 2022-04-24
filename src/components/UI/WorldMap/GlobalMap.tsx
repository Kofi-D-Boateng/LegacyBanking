import React from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { LatLngExpression } from "leaflet";
import LocationMarker from "./LocationMarker";

const GlobalMap: React.FC<{
  branch: {
    name: string;
    country: string;
    state: string;
    zipcode: string;
    totalHoldings: number;
    latitude: number;
    longitude: number;
  }[];
  classes: {
    readonly [key: string]: string;
  };
}> = ({ branch, classes }) => {
  const zoom: number = 2.5;
  const CENTER: LatLngExpression | undefined = [31.563572, -31.971787];

  return (
    <MapContainer
      center={CENTER}
      zoom={zoom}
      minZoom={zoom}
      scrollWheelZoom={false}
      className={classes.map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {branch.map((branch, index) => {
        return (
          <LocationMarker
            key={index}
            branch={branch}
            Marker={Marker}
            markerIcon={markerIcon}
            useMap={useMap}
          />
        );
      })}
    </MapContainer>
  );
};

export default GlobalMap;
