import { FC } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { LatLngExpression } from "leaflet";
import LocationMarker from "./LocationMarker";
import { Branch } from "../../../types/Bank";
import { ReactLeafLetTitleLayer } from "../Constants/Constants";

const GlobalMap: FC<{
  branch: Branch[];
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
        attribution={ReactLeafLetTitleLayer.att}
        url={ReactLeafLetTitleLayer.url}
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
