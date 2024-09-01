"use client";
import { cellToLatLng } from "h3-js";
import { useSearchParams } from "next/navigation";
import MapCanvas from "@/component/Navigation/MapCanvas";
import MapillaryViewer from "@/component/Navigation/MapillaryViewer";
import SideBar from "@/component/Navigation/SideBar";
import TopHeader from "@/component/Navigation/TopHeader";
import PageLoader from "@/component/shared/Pageloader";
import { useAppContext } from "@/lib/context/AppContext";
import { useEffect } from "react";
import APP_CONFIG from "@/constant/config";
import { decodeCoordinate } from "@/utils/url-code";
import StartMarker from "@/assets/icons/StartMarker";

const WebMap = () => {
  const searchParams = useSearchParams();
  const { MAP_CONFIG } = APP_CONFIG;

  const {
    showMap,
    setShowMap,
    setBaseMap,
    setStartMarker,
    setEndMarker,
    mapillaryImageId,
    setMapillaryImageId,
    mapLoaded,
    routeInfo,
    endMarker,
    startMarker
  } = useAppContext();

  useEffect(() => {
    if (!routeInfo && !startMarker && !endMarker && searchParams.has("route") ) {
      const route = searchParams.get("route");

      if(route as string) {
      const decodedRoute = decodeCoordinate(route as string);
      setStartMarker({
        latitude: decodedRoute[0][1],
        longitude: decodedRoute[0][0],
      });
      setEndMarker({
        latitude: decodedRoute[1][1],
        longitude: decodedRoute[1][0],
      });
      }

    }
  }, [MAP_CONFIG, endMarker, routeInfo, searchParams, setBaseMap, setEndMarker, setStartMarker, startMarker]);

  return (
    <div className="h-screen w-full font-work-sans">
      {showMap ? (
        <div className="h-full w-full flex md:flex-row flex-col relative">
          <SideBar />
          <div className="relative  md:order-2 order-1 flex-auto h-full">
            <MapCanvas />
          </div>
          {/* {mapLoaded && <TopHeader />}
          {mapillaryImageId && <MapillaryViewer />} */}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col gap-12 items-center justify-center">
          <PageLoader
            showLogo
            onLoaded={() => {
              setShowMap(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WebMap;
