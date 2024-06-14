"use client";

import PageLoader from "@/component/shared/Pageloader";
import React, { useState, useEffect } from "react";

const WebMap = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="h-full w-full">
      {showMap ? (
        <div>Map has been loaded Completely</div>
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
