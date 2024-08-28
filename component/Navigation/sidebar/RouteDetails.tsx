import React, { useEffect, useState } from "react";
import RouteTab from "../map-components/RouteTab";
import { ChevronUp, Loader2Icon } from "lucide-react";
import { useAppContext } from "@/lib/context/AppContext";
import RouteInfoSkeleton from "@/component/shared/ui/skeleton/RouteInfoSkeleton";
import { useGetPlace, useGetRoute } from "@/lib/api/query";
import type { RouteData } from "@/types/route";

const RouteDetails = () => {
  const {
    startMarker,
    setStartMarker,
    setRouteInfo,
    endMarker,
    setEndMarker,
    routeInfo,
    routeProfile,
    setRoute
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
          <div className="">
            <div>
              <h3 className="text-blue-300 text-lg font-semibold p-4">
                Route Details
              </h3>
            </div>
            <div>
              <div
                className="text-center flex items-center justify-center w-full p-[9px] cursor-pointer"
                onClick={() => setShowRouteDetails(!showRouteDetails)}
              >
                <span className="text-xs w-[8rem]">
                  {showRouteDetails ? "Show detail route" : "Hide detail route"}
                </span>
                <ChevronUp
                  className={`h-4 w-4 text-blue-200 transition-all delay-150 ease-in-out ${
                    showRouteDetails ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div>
          <RouteInfoSkeleton />
        </div>
      )}
    </div>
  );
};

export default RouteDetails;
