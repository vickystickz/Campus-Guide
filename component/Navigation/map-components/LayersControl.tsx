import { useAppContext } from "@/lib/context/AppContext";
import { useState } from "react";
import MapControlWrapper from "@/component/shared/ui/control";
import { BaseMapIcon } from "@/utils/exports/app-icons";
import TooltipWrapper from "@/component/shared/ui/wrapper/TooltipWrapper";
import APP_CONFIG from "@/constant/config";
import DropdownWrapper from "@/component/shared/ui/wrapper/DropdownWrapper";


const LayersControl = () => {
  const [activate, setActivate] = useState(false);
  const { TOOLTIP_CONFIG, MAP_CONFIG } = APP_CONFIG;
  const { setBaseMap, baseMap } = useAppContext();

  return (
      <DropdownWrapper
        MenuItems={[
          {
            id: MAP_CONFIG.MAP_STYLE.DEFAULT,
            value: "Mapillary",
          }
        ]}
        onOpenChange={(status) => setActivate(status)}
        activeItem={baseMap}
        label="Show Mapillary"
        onSelect={(item) => setBaseMap(item)}
      >
        <TooltipWrapper info={TOOLTIP_CONFIG.MAP_ICONS.BASEMAP} align="center">
        <MapControlWrapper
          activateControl={activate}
        >
          <BaseMapIcon className="map-control-icon" />
        </MapControlWrapper>
        </TooltipWrapper>
      </DropdownWrapper>
  );
};

export default LayersControl;
