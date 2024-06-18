import { useRef, useState } from "react";
import { MAPBOX_TOKEN } from "@/utils/urls";
import Map, { AttributionControl, Source, Layer } from "react-map-gl";
import { useAppContext } from "@/lib/context/AppContext";
import MapControl from "@/component/Navigation/MapControl";
import Markers from "@/component/Navigation/map-components/Markers";
import APP_CONFIG from "@/constant/config";
import { useMap } from "react-map-gl";

import type { FeatureCollection } from "geojson";

const MapCanvas = () => {
  const mapContainer = useRef(null);
  const { current: mymap } = useMap();
  const { CUSTOM_ATTRIBUTION, Layer_CONFIG } = APP_CONFIG;

  const {
    baseMap,
    viewState,
    setEndMarker,
    endMarker,
    startMarker,
    mapLoaded,
    setMapLoaded,
    route
  } = useAppContext();

  
  return (
    <Map
      ref={mapContainer}
      id="mymap"
      dragPan={true}
      dragRotate={true}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={viewState}
      mapStyle={baseMap}
      onLoad={() => {
        setMapLoaded(!mapLoaded);
      }}
      onClick={(e) => {
        if (!startMarker) return;
        if (endMarker) return;
        setEndMarker({
          longitude: e.lngLat.lng,
          latitude: e.lngLat.lat,
        });
      }}
      attributionControl={false}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <AttributionControl
        compact={true}
        customAttribution={CUSTOM_ATTRIBUTION}
      />
      {mapLoaded && <MapControl />}
      <Markers />
      {mapLoaded && <Source id="route" type="geojson" data={route}>
        <Layer {...Layer_CONFIG.LineStyle} />
      </Source>}
    </Map>
  );
};

export default MapCanvas;
