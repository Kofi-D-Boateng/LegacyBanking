import {
  Icon,
  LatLng,
  LatLngExpression,
  LeafletEventHandlerFn,
  LeafletEventHandlerFnMap,
  LeafletMouseEvent,
  LocationEvent,
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
  useMapEvents: (handlers: LeafletEventHandlerFnMap) => Map;
  useMap: () => Map;
}> = ({ Marker, geo, markerIcon, useMapEvents, useMap }) => {
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
