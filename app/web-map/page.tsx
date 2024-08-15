"use client";

import MapCanvas from "@/component/Navigation/MapCanvas";
import MapillaryViewer from "@/component/Navigation/MapillaryViewer";
import TopHeader from "@/component/Navigation/TopHeader";
import PageLoader from "@/component/shared/Pageloader";
import { useAppContext } from "@/lib/context/AppContext";



const WebMap = () => {
  const {
    showMap,
    setShowMap,
    mapillaryImageId,
    setMapillaryImageId,
    mapLoaded
  } = useAppContext()

  return (
    <div className="h-full w-full font-work-sans">
      {showMap ? (
        <div className="h-full relative w-full">
          <MapCanvas />
          {mapLoaded && <TopHeader />}
          {mapillaryImageId && <MapillaryViewer />}
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
