import Button from "@/component/shared/ui/button";
import {
  CloseToastIcon,
  RouteIcon,
  StartNavigationIcon,
} from "@/utils/exports/app-icons";
import CG from "@/assets/icons/CG";
import { useAppContext } from "@/lib/context/AppContext";
import APP_CONFIG from "@/constant/config";
import type { RouteData } from "@/types/route";
import { sora } from "@/app/font";
import { useGetPlace, useGetRoute } from "@/lib/api/query";
import { useMap } from "react-map-gl";
import { useEffect } from "react";
import {
  getFormattedDistance,
  getFormattedEstimatedTime,
} from "@/utils/navigation";
import StartMarker from "@/assets/icons/StartMarker";
import { Input } from "../shared/ui/input";
import RouteIcons from "../shared/ui/routeIcons";
import RouteTab from "@/component/Navigation/map-components/RouteTab";
import RouteInfoSkeleton from "@/component/shared/ui/skeleton/RouteInfoSkeleton";

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
    routeProfile,
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
    routeProfile
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

  const routeInfoAvailable = routeInfo && routeInfo?.length > 0;

  return (
    <div
      className={`absolute ${
        routeInfoAvailable
          ? "lg:top-0 md:h-full md:rounded-none"
          : "md:top-7 md:left-7 md:rounded-3xl md:h-fit"
      } rounded-t-3xl rounded-b-none bg-white shadow-modal bottom-0 md:w-fit w-full z-50 flex`}
    >
      <div className={`md:w-fit w-full flex flex-col h-full`}>
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
        <div
          className={`flex flex-col gap-5 lg:w-[26rem] md:w-[24rem] w-full lg:px-10 lg:py-8 md:px-4 md:py-6 px-4 py-6`}
        >
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
                <Input
                  placeholder="Where are you going to?"
                  className="w-full"
                />
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
        </div>

        {startMarker && endMarker && (
          <div className="border-t flex flex-col h-full border-blue-50 lg:px-10 lg:py-8 md:px-4 md:py-6 px-4 py-6">
            <RouteTab />
            {routeInfoAvailable && !isLoading && (
              <div>
                {routeInfo && routeInfo?.length > 0 && (
                  <div>
                    {/* <Button
                className="bg-cg-error px-3 py-2 w-fit font-medium md:text-p-xs text-p-xs text-white"
                icon={<CloseToastIcon className="text-white" />}
                iconPosition="right"
                onClick={() => {
                  setRouteInfo(null);
                  setEndMarker(null);
                }}
              >
                <span>Clear Route</span>
              </Button> */}
                    <div className="mt-4 font-sora">
                      <span className="text-p-base">
                        Est. time of arrival:{" "}
                        <span className="font-semibold mt-4 text-p-base text-blue-200">
                          {getFormattedEstimatedTime(routeInfo[0].duration)}
                        </span>
                        <span className="font-normal ml-2 text-p-base text-blue-200">
                          ({getFormattedDistance(routeInfo[0].distance)})
                        </span>{" "}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {isLoading && <RouteInfoSkeleton />}
          </div>
        )}
        {routeInfoAvailable && (
          <div className="w-full shadow-modal md:py-6 py-2 flex items-center justify-center">
            <Button
              className="bg-purple-200 md:px-6 md:py-[1rem] gap-2.5 w-fit font-medium md:text-s-sm text-p-xs text-white"
              icon={<StartNavigationIcon className="text-white" />}
              iconPosition="left"
              onClick={() => {}}
            >
              <span>Start</span>
            </Button>
          </div>
        )}

        {/* <Button
        href="/"
        className="bg-purple-300 font-medium w-fit h-fit md:text-p-base text-p-xs text-white"
        icon={<RouteIcon />}
        iconPosition="right"
      >
        <span>Contribute</span>
      </Button> */}
      </div>
    </div>
  );
};

export default TopHeader;
