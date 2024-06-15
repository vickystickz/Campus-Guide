import React from "react";
import BaseMapControl from "./map-components/BaseMapControl";
import GeoLocateControl from "./map-components/GeoLocateControl";
import ZoomControl from "./map-components/ZoomControl";

const MapControl = () => {
  return (
    <div className="absolute lg:right-8 md:right-4 right-2 bottom-1/4 space-y-8 ">
      <ZoomControl />

      <div className="space-y-4">
        <GeoLocateControl />
        <BaseMapControl />
      </div>
    </div>
  );
};

export default MapControl;
