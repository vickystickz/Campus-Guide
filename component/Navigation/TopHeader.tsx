import { useState } from "react";
import Button from "@/component/shared/ui/button";
import {
  CloseToastIcon,
  GeoLocateIcon,
  RouteIcon,
  StartNavigationIcon,
} from "@/utils/exports/app-icons";
import CG from "@/assets/icons/CG";
import { useAppContext } from "@/lib/context/AppContext";
import APP_CONFIG from "@/constant/config";
import type { RouteData } from "@/types/route";
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
import StepCard from "./StepCard";

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
  const [usedCurrentLocation, setUsedCurrentLocation] = useState(false);
  const [showModal, setShowModal] = useState(true);

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
      } rounded-t-3xl rounded-b-none bg-white flex-col overflow-hidden shadow-modal  transition-all delay-150 ease-in-out bottom-0 md:w-fit w-full z-50 flex`}
    >
      <div
        className="md:hidden flex items-center justify-center py-2 hover:cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        <span className="bg-neutral-400 rounded-full h-[0.3rem] w-[4rem]"></span>
      </div>
      <div
        className={`md:w-fit w-full h-full flex-col transition-all duration-300 ease-in-out  ${
          showModal
            ? "max-h-[calc(100vh-2rem)] opacity-100 transform translate-y-0"
            : "max-h-0 opacity-0 transform translate-y-full overflow-hidden"
        }`}
      >
        <div
          className={`flex flex-col gap-5 h-fit lg:w-[26rem] md:w-[24rem] w-full lg:px-10 lg:py-8 md:px-4 md:py-6 px-4 py-6`}
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
                  value={usedCurrentLocation ? "Your Location" : ""}
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
          {!routeInfoAvailable && (
            <div
              className="flex items-center gap-4 mt-2 cursor-pointer"
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setStartMarker({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    });
                    setUsedCurrentLocation(true);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }}
            >
              <GeoLocateIcon className="text-purple-600" />
              <span>Use my Current Location</span>
            </div>
          )}
        </div>

        {startMarker && endMarker && (
          <div className="border-t flex flex-auto flex-col border-blue-50 lg:px-10 lg:py-8 md:px-4 md:py-6 px-4 py-6">
            <RouteTab />
            {routeInfoAvailable && !isLoading ? (
              <div>
                {routeInfo && routeInfo?.length > 0 && (
                  <div>
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
            ) : isLoading ? (
              <RouteInfoSkeleton />
            ) : null}
          </div>
        )}
        {routeInfoAvailable && (  
          <ul className="md:h-full h-[15rem]  overflow-auto space-y-4 font-sora px-8 py-2 mt-1 mb-4 ">
            {routeInfo &&
              routeInfo?.length > 0 &&
              routeInfo[0].legs[0].steps.map((step, index) => {
                return (
                  <StepCard
                    intersections={step.intersections}
                    maneuver={step.maneuver}
                    name={step.name}
                    mode={step.mode}
                    duration={step.duration}
                    distance={step.distance}
                    driving_side={step.driving_side}
                    weight={step.weight}
                    geometry={step.geometry}
                    key={index}
                  />
                );
              })}
          </ul>
        )}

         {routeInfoAvailable && (
        <div className="w-full shadow-modal md:py-2 py-2 flex items-center justify-center">
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
