import React, { useEffect } from "react";
import { StartMarkerIcon, EndMarkerIcon } from "@/utils/exports/app-icons";
import { Marker, useMap } from "react-map-gl";
import { useAppContext } from "@/lib/context/AppContext";

const Markers = () => {
  const { current: mymap } = useMap();
  const { startMarker, endMarker, setEndMarker, setStartMarker } = useAppContext();


  return (
    <div>
      {startMarker && (
        <Marker
          longitude={startMarker.longitude}
          latitude={startMarker.latitude}
          anchor="bottom"
          draggable={true}
          rotationAlignment="auto"
          onDragEnd={(e) => {
            setStartMarker({
              longitude: e.lngLat.lng,
              latitude: e.lngLat.lat
            })
          }} 
          onClick={() => {
            if (!mymap) return;
            mymap.flyTo({
              center: [startMarker.longitude, startMarker.latitude],
              zoom: 14,
            });
          }}
        >
          <StartMarkerIcon className="cursor-pointer" />
        </Marker>
      )}

      {endMarker && (
        <Marker
          draggable={true}
          onDragEnd={(e) => {
            setEndMarker({
              longitude: e.lngLat.lng,
              latitude: e.lngLat.lat
            })
          }} 
          longitude={endMarker.longitude}
          latitude={endMarker.latitude}
          anchor="bottom"
          onClick={() => {
            if (!mymap) return;
            mymap.flyTo({
              center: [endMarker.longitude, endMarker.latitude],
              zoom: 14,
            });
          }}
        >
          <EndMarkerIcon className="cursor-pointer" />
        </Marker>
      )}
    </div>
  );
};

export default Markers;
