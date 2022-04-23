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
import { Geolocation } from "../../../Interfaces/Maps";

const LocationMarker: React.FC<{
  Marker: React.ForwardRefExoticComponent<
    MarkerProps & React.RefAttributes<Marker<any>>
  >;
  geo: Geolocation;
  markerIcon: string;
  useMap: () => Map;
  branch: {
    name: string;
    country: string;
    area: string;
    zipcode: string;
    totalHoldings: number;
  }[];
}> = ({ Marker, geo, markerIcon, useMap, branch }) => {
  const [position, setPosition] = useState<LatLngExpression | undefined>(
    undefined
  );

  const MAP: Map = useMap();
  const MarkerFn: LeafletEventHandlerFnMap = {
    click(e: LeafletMouseEvent) {
      console.log(e.latlng);
      setPosition(e.latlng);
      MAP.flyTo(e.latlng, MAP.getZoom());
    },
  };

  return (
    <>
      <Marker
        position={[geo.geometry.lat, geo.geometry.lng]}
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
          <h1>{geo.geometry.city}</h1>
        </Popup>
      )}
    </>
  );
};

export default LocationMarker;
