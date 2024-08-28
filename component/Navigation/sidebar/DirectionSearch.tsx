import { useState } from "react";
import { Input } from "@/component/shared/ui/input";
import { CloseToastIcon, GeoLocateIcon } from "@/utils/exports/app-icons";
import { useAppContext } from "@/lib/context/AppContext";
import RouteIcons from "@/component/shared/ui/routeIcons";

const DirectionSearch = () => {
  const { startMarker, setStartMarker, setRouteInfo, endMarker, setEndMarker } =
    useAppContext();
  const [usedCurrentLocation, setUsedCurrentLocation] = useState(false);
  const [isLoadingCurrentLocation, setIsLoadingCurrentLocation] = useState(false);
  return (
    <div>
      <div className="flex md:gap-2 gap-2">
        <RouteIcons />
        <div className="flex flex-col gap-2 w-full">
          <div className="relative">
            <Input
              placeholder="Where are you right now?"
              className="w-full bg-white"
              value={usedCurrentLocation ? "Your Location" : ""}
            />
            {startMarker && (
              <CloseToastIcon
                className="absolute top-4 right-2 h-4 w-4 hover:text-cg-error"
                onClick={() => {
                  setStartMarker(null);
                  setRouteInfo(null);
                }}
              />
            )}
          </div>
          <div className="relative">
            <Input
              placeholder="Where are you going to?"
              className="w-full bg-white"
            />
            {endMarker && (
              <CloseToastIcon
                className="absolute top-4 right-2 h-4 w-4 hover:text-cg-error"
                onClick={() => {
                  setEndMarker(null);
                  setRouteInfo(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-between mt-2 cursor-pointer"
        onClick={() => {
          setIsLoadingCurrentLocation(!isLoadingCurrentLocation);
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setStartMarker({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              setIsLoadingCurrentLocation(false);
              setUsedCurrentLocation(true);
            },
            (error) => {
              setIsLoadingCurrentLocation(false);
              console.log(error);
            }
          );
        }}
      >
        <div className="flex items-center gap-2 pt-4">
          <GeoLocateIcon className={`${usedCurrentLocation && startMarker ? "text-purple-300": "text-neutral-300 "}`} />
          <span className="text-xs">Use my current location</span>
        </div>
        {isLoadingCurrentLocation && (
          <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-cg-info rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export default DirectionSearch;
