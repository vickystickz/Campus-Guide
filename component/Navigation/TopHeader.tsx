import Button from "@/component/shared/ui/button";
import { RouteIcon } from "@/utils/exports/app-icons";
import CG from "@/assets/icons/CG";
import { useAppContext } from "@/lib/context/AppContext";
import APP_CONFIG from "@/constant/config";
import { useQuery } from "@tanstack/react-query";
import { useGetPlace, useGetRoute } from "@/lib/api/query";
import { useMap } from "react-map-gl";
import { useEffect } from "react";
import { start } from "repl";
import StartMarker from "@/assets/icons/StartMarker";

const TopHeader = () => {
  const { MAP_CONFIG } = APP_CONFIG;
  const { baseMap, setStartMarker, startMarker } = useAppContext();
  const { current: mymap } = useMap();

  // route request
  // const { data, isLoading, isError, error } = useGetRoute({
  //   lat: 37.7729,
  //   lon: -122.2194,
  // }, {
  //   lat: 37.7749,
  //   lon: -122.4194,
  // }, "driving")


  // const { data, isLoading, isError, error } = useGetPlace(
  //   "San Francisco",
  //   5
  // )

  return (
    <div className="absolute top-6 lg:px-8 md:px-4 px-4 w-full flex items-center justify-between">
      <div>
        <Button
            href="/"
            className={`block p-0 ${baseMap === MAP_CONFIG.MAP_STYLE.DEFAULT ? "text-blue-300" : "text-white"}`}
        >
             <CG />
        </Button>
       
      </div>
      <Button
        href="/"
        className="bg-purple-300 font-medium md:text-p-base text-p-xs text-white"
        icon={<RouteIcon />}
        iconPosition="right"
      >
        <span>Contribute</span>
      </Button>
    </div>
  );
};

export default TopHeader;
