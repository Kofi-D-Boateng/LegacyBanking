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
import bank from "../../../assets/photos/bank.jpg";

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
  const [p, setP] = useState<LatLngExpression | undefined>();
  const MAP: Map = useMap();
  const MarkerFn: LeafletEventHandlerFnMap = {
    click(e: LeafletMouseEvent) {
      setP(e.latlng);
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
      {p && (
        <Popup position={p}>
          <Grid sx={{ display: "inline-block" }} container>
            <Typography variant="h6"> {branch.name}</Typography>
            <Typography variant="h6">{"Country: " + branch.country}</Typography>
            <Typography variant="h6">{"Area: " + branch.state}</Typography>
          </Grid>
          <Grid sx={{ margin: "30px 0" }} container>
            <img
              style={{ width: "100%", margin: "auto" }}
              src={bank}
              alt="bank.jpg"
            />
          </Grid>
        </Popup>
      )}
    </>
  );
};

export default LocationMarker;
