import React from "react";
import { StartMarkerIcon } from "@/utils/exports/app-icons";
import { Marker, useMap } from "react-map-gl";
import { useAppContext } from "@/lib/context/AppContext";

const Markers = () => {
  const { current: mymap } = useMap();
  const {
    startMarker
  } = useAppContext()



  return startMarker && (
    <Marker
      longitude={startMarker.longitude}
      latitude={startMarker.latitude}
      anchor="bottom"
      onClick={() => {
        if (!mymap) return;
        mymap.flyTo({
          center: [startMarker.longitude, startMarker.latitude],
          zoom: 14
        });
      }}
    >
      <StartMarkerIcon className="cursor-pointer" />
    </Marker>
  );
};

export default Markers;
