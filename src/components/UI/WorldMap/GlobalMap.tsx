import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { LatLngExpression } from "leaflet";
import { Geolocation } from "../../../Interfaces/Maps";
import LocationMarker from "./LocationMarker";

const GlobalMap: React.FC<{
  branch: {
    name: string;
    country: string;
    area: string;
    zipcode: string;
    totalHoldings: number;
  }[];
  Geolocation: Geolocation[];
}> = ({ branch, Geolocation }) => {
  const zoom: number = 2.5;
  const CENTER: LatLngExpression | undefined = [31.563572, -31.971787];

  return (
    <MapContainer
      center={CENTER}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100wh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Geolocation.map((geo) => {
        return (
          <LocationMarker
            key={geo.id}
            geo={geo}
            Marker={Marker}
            markerIcon={markerIcon}
            useMapEvents={useMapEvents}
            useMap={useMap}
          />
        );
      })}
    </MapContainer>
  );
};

export default GlobalMap;
