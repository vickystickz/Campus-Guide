import { useState } from "react";
import { Input } from "@/component/shared/ui/input";
import { CloseToastIcon, GeoLocateIcon } from "@/utils/exports/app-icons";
import { useAppContext } from "@/lib/context/AppContext";
import RouteIcons from "@/component/shared/ui/routeIcons";
import RouteInfoSkeleton from "@/component/shared/ui/skeleton/RouteInfoSkeleton";
import { useGetPlace } from "@/lib/api/query";
import { useRouter } from "next/navigation";
import { APP_DOMAIN } from "@/utils/urls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/component/shared/ui/dropdown"

const DirectionSearch = () => {
  const router = useRouter();
  const {
    startMarker,
    setStartMarker,
    routeInfo,
    setRouteInfo,
    endMarker,
    setEndMarker,
    setSharedUrl,
    maxBounds,
  } = useAppContext();
  const [usedCurrentLocation, setUsedCurrentLocation] = useState(false);
  const [showStartPlaceSuggestions, setShowStartPlaceSuggestions] =
    useState(false);
  const [showEndPlaceSuggestions, setShowEndPlaceSuggestions] = useState(false);
  const [isLoadingCurrentLocation, setIsLoadingCurrentLocation] =
    useState(false);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const bbox: Array<Array<number>> = maxBounds as Array<Array<number>>;

  const bboxString = bbox
  ? bbox[0].join(",") + "," + bbox[1].join(",")
  : ""; // or use a default bounding box value if needed

  const { data: startPlace, isLoading: isLoadingStartPlaces } = useGetPlace(
    startLocation,
    3,
    bboxString
  );
  const { data: endPlace, isLoading: isLoadingEndPlaces } = useGetPlace(
    endLocation,
    4,
    bboxString
  );




  return (
    <div>
      <div className="flex md:gap-2 gap-2">
        <RouteIcons />
        <div className="flex flex-col gap-2 w-full">
        <div className="relative">
            <Input
              placeholder="Where are you right now?"
              className="w-full bg-white"
              value={startLocation}
              onChange={(e) => {
                setStartLocation(e.target.value);
                setShowStartPlaceSuggestions(true);
              }}
            />
            {(startMarker || startLocation) && (
              <CloseToastIcon
                className="absolute top-4 right-2 h-4 w-4 hover:text-cg-error"
                onClick={() => {
                  if (routeInfo) {
                    setRouteInfo(null);
                    router.push(`${APP_DOMAIN}/map`);
                  }
                  setStartMarker(null);
                  setStartLocation("");
                  setSharedUrl(null);
                }}
              />
            )}
            {showStartPlaceSuggestions && (
              <div className="absolute w-full mt-1 z-30">
                {isLoadingStartPlaces ? (
                  <div className="bg-white shadow-md md:max-h-[10rem] space-y-2 overflow-auto max-h-[8rem] rounded-md py-2 px-3">
                    <RouteInfoSkeleton height={25} />
                  </div>
                ) : null}
                {startPlace && (
                  <ul className="bg-white shadow-md md:max-h-[10rem] space-y-2 overflow-auto max-h-[8rem] rounded-md py-2 px-3">
                    {startPlace?.features?.map((place: any) => {
                      return (
                        <li
                          key={place?.properties?.osm_id}
                          onClick={() => {
                            setStartMarker({
                              latitude: place?.geometry?.coordinates[1],
                              longitude: place?.geometry?.coordinates[0],
                            });
                            setStartLocation(place?.properties?.name);
                            setShowStartPlaceSuggestions(false);
                          }}
                          className="p-2 hover:bg-purple-50 text-sm font-medium rounded-md cursor-pointer truncate"
                        >
                          {place?.properties?.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <Input
              placeholder="Where are you going to?"
              className="w-full bg-white"
              value={endLocation}
              onChange={(e) => {
                setEndLocation(e.target.value);
                setShowEndPlaceSuggestions(true);
              }}
            />
            {(endMarker || endLocation) && (
              <CloseToastIcon
                className="absolute top-4 right-2 h-4 w-4 hover:text-cg-error"
                onClick={() => {
                  if (routeInfo) {
                    setRouteInfo(null);
                    router.push(`${APP_DOMAIN}/map`);
                  }
                  setEndMarker(null);
                  setEndLocation("");
                  setSharedUrl(null);
                }}
              />
            )}
            {showEndPlaceSuggestions && (
              <div className="absolute w-full mt-1 z-30">
                {isLoadingEndPlaces ? (
                  <div className="bg-white shadow-md md:max-h-[10rem] space-y-2 overflow-auto max-h-[8rem] rounded-md py-2 px-3">
                    <RouteInfoSkeleton height={25} />
                  </div>
                ) : null}
                {endPlace && (
                  <ul className="bg-white shadow-md md:max-h-[10rem] space-y-2 overflow-auto max-h-[8rem] rounded-md py-2 px-3">
                    {endPlace?.features?.map((place: any, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setEndMarker({
                              latitude: place?.geometry?.coordinates[1],
                              longitude: place?.geometry?.coordinates[0],
                            });
                            setEndLocation(place?.properties?.name);
                            setShowEndPlaceSuggestions(false);
                          }}
                          className="p-2 hover:bg-purple-50 text-sm font-medium rounded-md cursor-pointer truncate"
                        >
                          {place?.properties?.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
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
          <GeoLocateIcon
            className={`${
              usedCurrentLocation && startMarker
                ? "text-purple-300"
                : "text-neutral-300 "
            }`}
          />
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
