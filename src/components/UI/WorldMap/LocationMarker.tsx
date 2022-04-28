import { Grid, Typography } from "@mui/material";
import {
  Icon,
  LatLngExpression,
  LeafletEventHandlerFnMap,
  LeafletMouseEvent,
  Map,
  Marker,
} from "leaflet";
import { useState } from "react";
import { MarkerProps, Popup } from "react-leaflet";

const LocationMarker: React.FC<{
  Marker: React.ForwardRefExoticComponent<
    MarkerProps & React.RefAttributes<Marker<any>>
  >;
  markerIcon: string;
  useMap: () => Map;
  branch: {
    name: string;
    country: string;
    state: string;
    zipcode: string;
    totalHoldings: number;
    latitude: number;
    longitude: number;
  };
}> = ({ Marker, markerIcon, useMap, branch }) => {
  const [position, setPosition] = useState<LatLngExpression | undefined>(
    undefined
  );

  const MAP: Map = useMap();
  const MarkerFn: LeafletEventHandlerFnMap = {
    click(e: LeafletMouseEvent) {
      setPosition(e.latlng);
      MAP.flyTo(e.latlng, MAP.getZoom());
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
      {position && (
        <Popup position={position}>
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
