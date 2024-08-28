"use client";

import MapCanvas from "@/component/Navigation/MapCanvas";
import MapillaryViewer from "@/component/Navigation/MapillaryViewer";
import SideBar from "@/component/Navigation/SideBar";
import TopHeader from "@/component/Navigation/TopHeader";
import PageLoader from "@/component/shared/Pageloader";
import { useAppContext } from "@/lib/context/AppContext";

const WebMap = () => {
  const {
    showMap,
    setShowMap,
    mapillaryImageId,
    setMapillaryImageId,
    mapLoaded,
  } = useAppContext();

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
