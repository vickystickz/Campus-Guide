import MapControlWrapper from "@/component/shared/ui/control";
import { ZoomOutIcon, ZoomInIcon } from "@/utils/exports/app-icons";
import { useMap } from "react-map-gl";
import TooltipWrapper from "@/component/shared/ui/wrapper/TooltipWrapper";
import APP_CONFIG from "@/constant/config";

const ZoomControl = () => {
  // Get map instance
  const { current: mymap } = useMap();
  // Get tooltip config
  const { TOOLTIP_CONFIG } = APP_CONFIG;


  // Function to handle map zoom
  const handleMapZoom = (type: string) => {
    if (!mymap) return;
    switch (type) {
      case "in":
        mymap.zoomIn();
        break;
      case "out":
        mymap.zoomOut();
        break;
      default:
        break;
    }
  };

  return (
    <div className="rounded-full h-fit overflow-clip">
      <TooltipWrapper info={TOOLTIP_CONFIG.MAP_ICONS.ZOOM_IN} align="center">
        <MapControlWrapper
          style="rounded-none bg-none"
          onClick={() => handleMapZoom("in")}
        >
          <ZoomInIcon className="map-control-icon" />
        </MapControlWrapper>
      </TooltipWrapper>
      <hr></hr>
      <TooltipWrapper info={TOOLTIP_CONFIG.MAP_ICONS.ZOOM_OUT} align="center">
        <MapControlWrapper
          style="rounded-none bg-none"
          onClick={() => handleMapZoom("out")}
        >
          <ZoomOutIcon className="map-control-icon" />
        </MapControlWrapper>
      </TooltipWrapper>
    </div>
  );
};

export default ZoomControl;
