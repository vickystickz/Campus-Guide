import MapControlWrapper from "@/component/shared/ui/control";
import { GeoLocateIcon } from "@/utils/exports/app-icons";
import { useAppContext } from "@/lib/context/AppContext";
import { useMap } from "react-map-gl";
import { useState } from "react";

const GeoLocateControl = () => {
  const { current: mymap } = useMap();
  const [activate, setActivate] = useState(false);
  const { setStartMarker, startMarker } = useAppContext();

  const handleGetUserLocation = () => {
    if (!activate) {
      if (navigator.geolocation) {
        setActivate(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setStartMarker({
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
      if(activate && startMarker){
        setStartMarker(null)
        setActivate(false);
        return
      }
      setActivate(false)
    }
  };

  
  return (
    <MapControlWrapper onClick={handleGetUserLocation} activateControl={activate}>
      <GeoLocateIcon className="map-control-icon" />
    </MapControlWrapper>
  );
};

export default GeoLocateControl;
