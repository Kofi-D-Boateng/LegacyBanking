import { Grid, Typography } from "@mui/material";
import {
  Icon,
  LatLngExpression,
  LeafletEventHandlerFnMap,
  LeafletMouseEvent,
  Map,
  Marker,
} from "leaflet";
import { useState, FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { MarkerProps, Popup } from "react-leaflet";
import { Branch } from "../../../types/Bank";

const LocationMarker: FC<{
  Marker: ForwardRefExoticComponent<MarkerProps & RefAttributes<Marker<any>>>;
  markerIcon: string;
  useMap: () => Map;
  branch: Branch;
}> = ({ Marker, markerIcon, useMap, branch }) => {
  const [pos, setPos] = useState<LatLngExpression | undefined>(undefined);
  const MAP: Map = useMap();
  const MarkerFn: LeafletEventHandlerFnMap = {
    click(e: LeafletMouseEvent) {
      MAP.flyTo(e.latlng, MAP.getZoom());
      setPos(e.latlng);
    },
  };

  const BankIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <>
      <Marker
        position={[branch.latitude, branch.longitude]}
        icon={BankIcon}
        eventHandlers={MarkerFn}
      />
      {pos && (
        <Popup position={pos}>
          <Grid container>
            <Typography variant="h6"> {branch.name}</Typography>
            <Typography variant="body1">
              {"Country: " + branch.country}
            </Typography>
          </Grid>
          <Grid container>
            <Typography variant="body1">{"Area: " + branch.state}</Typography>
          </Grid>
        </Popup>
      )}
    </>
  );
};

export default LocationMarker;
