import MapControlWrapper from "@/component/shared/ui/control";
import { BaseMapIcon } from "@/utils/exports/app-icons";
import React from "react";

const BaseMapControl = () => {
  return (
    <MapControlWrapper>
      <BaseMapIcon className="map-control-icon" />
    </MapControlWrapper>
  );
};

export default BaseMapControl;
