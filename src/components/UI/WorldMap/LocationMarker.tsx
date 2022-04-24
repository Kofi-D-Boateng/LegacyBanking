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

  return (
    <>
      <Marker
        position={[branch.latitude, branch.longitude]}
        icon={
          new Icon({
            iconUrl: markerIcon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
        eventHandlers={MarkerFn}
      />
      {position && (
        <Popup position={position} onClose={() => setPosition(undefined)}>
          <Grid container>
            <Typography variant="body1">{"Name: " + branch.name}</Typography>
            <Typography variant="body1">
              {"Country: " + branch.country}
            </Typography>
            <Typography variant="body1">{"Area: " + branch.state}</Typography>
          </Grid>
        </Popup>
      )}
    </>
  );
};

export default LocationMarker;
