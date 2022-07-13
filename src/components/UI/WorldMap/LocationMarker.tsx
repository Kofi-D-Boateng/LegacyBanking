import { Grid, Typography } from "@mui/material";
import {
  Icon,
  LatLngExpression,
  LeafletEventHandlerFnMap,
  LeafletMouseEvent,
  Map,
  Marker,
} from "leaflet";
import { MarkerProps, Popup } from "react-leaflet";
import { NavigateFunction } from "react-router-dom";

const LocationMarker: React.FC<{
  Marker: React.ForwardRefExoticComponent<
    MarkerProps & React.RefAttributes<Marker<any>>
  >;
  nav: NavigateFunction;
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
  param: URLSearchParams;
}> = ({ Marker, markerIcon, useMap, branch, nav, param }) => {
  const lat: number | undefined = param.get("lat")
    ? parseFloat(param.get("lat") as string)
    : undefined;
  const lng: number | undefined = param.get("lng")
    ? parseFloat(param.get("lng") as string)
    : undefined;
  const position: LatLngExpression = { lat: lat ? lat : 0, lng: lng ? lng : 0 };
  const MAP: Map = useMap();
  const MarkerFn: LeafletEventHandlerFnMap = {
    click(e: LeafletMouseEvent) {
      nav(`/locations?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
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
      {position.lat && (
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
