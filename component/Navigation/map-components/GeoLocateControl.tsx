import MapControlWrapper from "@/component/shared/ui/control";
import { GeoLocateIcon } from "@/utils/exports/app-icons";
import { useAppContext } from "@/lib/context/AppContext";
import { useMap } from "react-map-gl";
import { useEffect, useState } from "react";
import TooltipWrapper from "@/component/shared/ui/wrapper/TooltipWrapper";
import APP_CONFIG from "@/constant/config";

const GeoLocateControl = () => {
  const { current: mymap } = useMap();
  const [activate, setActivate] = useState(false);
  const { TOOLTIP_CONFIG } = APP_CONFIG
  const { setStartMarker, startMarker, currentLocation, setCurrentLocation } = useAppContext();

  const handleGetUserLocation = () => {
    if (!activate) {
      if (navigator.geolocation) {
        setActivate(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({
              longitude: longitude,
              latitude: latitude,
            });
            if (!mymap) return;
            mymap.flyTo({
              center: [longitude, latitude],
              zoom: 18,
            });
          },
          (error) => {
            console.error("Error getting user's location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } else {
      if(activate && currentLocation){
        setCurrentLocation(null)
        setActivate(false);
        return
      }
      setActivate(false)
    }
  };

  useEffect(() => {
    if(!currentLocation && startMarker){
      setActivate(false)
    }
  }, [currentLocation, activate, startMarker]);
  
  return (
    <TooltipWrapper
      info={TOOLTIP_CONFIG.MAP_ICONS.GEOLOCATION}
    >
    <MapControlWrapper onClick={handleGetUserLocation} activateControl={activate}>
      <GeoLocateIcon className="map-control-icon" />
    </MapControlWrapper>
    </TooltipWrapper>
  );
};

export default GeoLocateControl;
