import { EndRouteIcon, StartRouteIcon } from "@/utils/exports/app-icons";
import React from "react";
import Image from "next/image";
import Line from "@/public/route-line.svg";
import { useAppContext } from "@/lib/context/AppContext";

const RouteIcons = () => {
  const { startMarker, endMarker, routeInfo } = useAppContext();

  const routeInfoAvailable = routeInfo && routeInfo?.length > 0;
  return (
    <div className="flex flex-col  justify-between py-[0.6rem] relative">
      <div className="flex items-center justify-center w-6 h-6 rounded-full shadow-toast">
        <StartRouteIcon
          className={` ${startMarker ? "opacity-1" : "opacity-50"}`}
        />
      </div>

      {routeInfoAvailable && (
        <Image
          src={Line}
          alt="Route line"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2"
        />
      )}
      <div className="flex items-center justify-center w-6 h-6 rounded-full shadow-toast">
        <EndRouteIcon
          className={` opacity ${endMarker ? "opacity-1" : "opacity-50"}`}
        />
      </div>
    </div>
  );
};

export default RouteIcons;
