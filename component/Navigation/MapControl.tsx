import React from "react";
import BaseMapControl from "./map-components/BaseMapControl";
import GeoLocateControl from "./map-components/GeoLocateControl";
import ZoomControl from "./map-components/ZoomControl";

const MapControl = () => {
  return (
    <div className="absolute lg:right-8 md:right-4 md:top-auto lg:top-auto right-4 md:bottom-1/4 top-32 space-y-8 ">
      <ZoomControl />
      <div className="space-y-4 flex flex-col ">
        <GeoLocateControl />
        <BaseMapControl />
      </div>
    </div>
  );
};

export default MapControl;
