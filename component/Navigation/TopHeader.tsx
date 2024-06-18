import Button from "@/component/shared/ui/button";
import { CloseToastIcon, RouteIcon } from "@/utils/exports/app-icons";
import CG from "@/assets/icons/CG";
import { useAppContext } from "@/lib/context/AppContext";
import APP_CONFIG from "@/constant/config";
import type { RouteData } from "@/types/route";
import { useGetPlace, useGetRoute } from "@/lib/api/query";
import { useMap } from "react-map-gl";
import { useEffect } from "react";
import { start } from "repl";
import StartMarker from "@/assets/icons/StartMarker";
import { Input } from "../shared/ui/input";
import RouteIcons from "../shared/ui/routeIcons";

const TopHeader = () => {
  const { MAP_CONFIG } = APP_CONFIG;
  const {
    baseMap,
    setStartMarker,
    startMarker,
    setEndMarker,
    endMarker,
    setRoute,
    setRouteInfo,
    routeInfo,
  } = useAppContext();
  const { current: mymap } = useMap();

  // route request
  const { data, isLoading, isError, error } = useGetRoute(
    {
      lat: startMarker?.latitude || 0,
      lon: startMarker?.longitude || 0,
    },
    {
      lat: endMarker?.latitude || 0,
      lon: endMarker?.longitude || 0,
    },
    "driving"
  );

  useEffect(() => {
    if (data) {
      if (data as RouteData) {
        setRouteInfo(data.routes);
      }
    }
  }, [data, error, routeInfo, setRoute, setRouteInfo]);

  // const { data, isLoading, isError, error } = useGetPlace(
  //   "San Francisco",
  //   5
  // )

  return (
    <div className="absolute md:top-6 lg:px-8 md:px-4 bottom-0 md:w-fit md:h-fit w-full z-50 flex justify-between">
      {/* <div>
        <Button
          href="/"
          className={`block p-0 ${
            baseMap === MAP_CONFIG.MAP_STYLE.DEFAULT
              ? "text-blue-300"
              : "text-white"
          }`}
        >
          <CG />
        </Button>
      </div> */}
      <div className="bg-white shadow-modal flex flex-col gap-5 md:rounded-3xl rounded-t-3xl rounded-b-none lg:w-[25rem] md:w-[22rem] w-full lg:px-6 lg:py-8 md:px-4 md:py-6 px-4 py-6">
        <Button href="/" className={`md:block hidden p-0 text-blue-300`}>
          <CG />
        </Button>

        <div className="flex md:gap-4 gap-2">
          <RouteIcons />
          <div className="flex flex-col gap-4 w-full">
            <div className="relative">
              <Input
                placeholder="Where are you right now?"
                className="w-full"
              />
              {startMarker && (
                <CloseToastIcon
                  className="absolute top-3 right-2 h-5 w-5 hover:text-cg-error"
                  onClick={() => {
                    setStartMarker(null);
                    setRouteInfo(null);
                  }}
                />
              )}
            </div>
            <div className="relative">
              <Input placeholder="Where are you going to?" className="w-full" />
              {endMarker && (
                <CloseToastIcon
                  className="absolute top-3 right-2 h-5 w-5 hover:text-cg-error"
                  onClick={() => {
                    setEndMarker(null);
                    setRouteInfo(null);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {routeInfo && routeInfo?.length > 0 && (
          <div>
            <Button
              className="bg-cg-error px-3 py-2 w-fit font-medium md:text-p-xs text-p-xs text-white"
              icon={<CloseToastIcon className="text-white" />}
              iconPosition="right"
              onClick={() => {
                setRouteInfo(null);
                setEndMarker(null);
              }}
            >
              <span>Clear Route</span>
            </Button>
            <div className="mt-4">
              <span>
                Est. time of arrival:{" "}
                <span className="font-sora font-semibold text-p-base text-blue-200">
                  {routeInfo[0].duration.toFixed()} min
                </span>{" "}
                <span className="font-sora font-normal text-p-base text-blue-200">{`(${routeInfo[0].distance.toFixed()} km)`}</span>{" "}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* <Button
        href="/"
        className="bg-purple-300 font-medium w-fit h-fit md:text-p-base text-p-xs text-white"
        icon={<RouteIcon />}
        iconPosition="right"
      >
        <span>Contribute</span>
      </Button> */}
    </div>
  );
};

export default TopHeader;
