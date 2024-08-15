import React, { useEffect } from "react";
import { MAPILLARY_TOKEN } from "@/utils/urls";
import { Viewer } from "mapillary-js";
import { useAppContext } from "@/lib/context/AppContext";

const MapillaryViewer = () => {
  const { mapillaryImageId } = useAppContext();

  useEffect(() => {
    if (mapillaryImageId) {
      const options = {
        accessToken: MAPILLARY_TOKEN,
        container: "mapillary-viewer",
        imageId: mapillaryImageId ? mapillaryImageId : "",
      };

      const MapillaryViewer = new Viewer(options);
    }
  }, [mapillaryImageId]);

  return (
    <div className="absolute bottom-9 left-2 rounded-xl shadow-modal  overflow-clip w-[30rem] h-[20rem]">
      <div id="mapillary-viewer" className="w-full relative h-full overflow-clip"></div>
    </div>
  );
};

export default MapillaryViewer;
