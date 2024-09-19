import React, { useEffect, useState } from "react";
import RouteTab from "../map-components/RouteTab";
import { ChevronUp, Loader2Icon } from "lucide-react";
import { useAppContext } from "@/lib/context/AppContext";
import RouteInfoSkeleton from "@/component/shared/ui/skeleton/RouteInfoSkeleton";
import { useGetPlace, useGetRoute } from "@/lib/api/query";
import type { RouteData } from "@/types/route";
import StepCard from "../StepCard";
import { getFormattedDistance, getFormattedEstimatedTime } from "@/utils/navigation";

const RouteDetails = () => {
  const {
    startMarker,
    setStartMarker,
    setRouteInfo,
    endMarker,
    setEndMarker,
    routeInfo,
    routeProfile,
    setRoute,
  } = useAppContext();
  const [showRouteDetails, setShowRouteDetails] = useState(false);

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

  const activeRouteDetails = routeInfo && routeInfo.length > 0;

  return (
    <div className="md:space-y-6 sapace-y-4">
      <RouteTab />
      {activeRouteDetails && !isLoading && (
        <div className="bg-white rounded-md mx-4">
          <div className="max-h-[26rem] overflow-auto ">
            <div className="p-4">
              <h3 className="text-blue-300 text-sm font-semibold">
                Route Details:
              </h3>
              <h4 className="text-lg mt-4 text-blue-300 font-semibold">
                {routeInfo[0].legs[0].summary}
              </h4>
              {routeInfo && routeInfo?.length > 0 && (
                  <div>
                    <div className="mt-1 font-sora">
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
            
            <div>
              <div
                className="text-center flex items-center justify-center w-full p-[9px] cursor-pointer"
                onClick={() => setShowRouteDetails(!showRouteDetails)}
              >
                <span className="text-xs w-[8rem]">
                  {showRouteDetails ? "Hide detail route" : "Show detail route"}
                </span>
                <ChevronUp
                  className={`h-4 w-4 text-blue-200 transition-all delay-150 ease-in-out ${
                    !showRouteDetails ? "rotate-180" : ""
                  }`}
                />
              </div>
              {showRouteDetails && (
                <ul className="mx-2">
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
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="mx-4">
          <RouteInfoSkeleton />
        </div>
      )}
    </div>
  );
};

export default RouteDetails;
