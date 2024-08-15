import { useRef } from "react";
import { MAPBOX_TOKEN, MAPILLARY_TOKEN } from "@/utils/urls";
import Map, { AttributionControl, Source, Layer } from "react-map-gl";
import { MapLayerMouseEvent } from "mapbox-gl";
import { useAppContext } from "@/lib/context/AppContext";
import MapControl from "@/component/Navigation/MapControl";
import Markers from "@/component/Navigation/map-components/Markers";
import APP_CONFIG from "@/constant/config";
import type { FeatureCollection } from "geojson";

const MapCanvas = () => {
  const mapContainer = useRef(null);
  const { CUSTOM_ATTRIBUTION, Layer_CONFIG } = APP_CONFIG;

  const {
    baseMap,
    viewState,
    setEndMarker,
    endMarker,
    startMarker,
    mapLoaded,
    setMapLoaded,
    setMapillaryImageId,
    route,
    routeProfile
  } = useAppContext();

  const mapillaryTilesUrl = `https://tiles.mapillary.com/maps/vtp/mly1_computed_public/2/{z}/{x}/{y}?access_token=${MAPILLARY_TOKEN}`;
  
  const handleMapClickEvent =(event: MapLayerMouseEvent) =>{
    const { features } = event;
    if(features && features.length>0){
      // Query the Mapillary layer features at the clicked point
    const mapillaryFeatures = features.filter(
      (feature) => feature.layer.id === 'mapillary'
    );

    if (mapillaryFeatures.length) {
      const imageId = mapillaryFeatures[0]?.properties?.image_id;
      console.log(mapillaryFeatures)
      setMapillaryImageId(imageId)
    }
    return
    }
    if (!startMarker) return;
    if (endMarker) return;
    setEndMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
}


  return (
    <Map
      ref={mapContainer}
      id="mymap"
      dragPan={true}
      dragRotate={true}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={viewState}
      mapStyle={baseMap}
      interactiveLayerIds={[
        "mapillary",
        "route"
      ]}
      onLoad={() => {
        setMapLoaded(!mapLoaded);
      }}
      onClick={handleMapClickEvent}
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
      {mapLoaded && (
        <>
          <Source id="route" type="geojson" data={route}>
          {routeProfile === "driving"  && (
            <Layer {...Layer_CONFIG.DriveLineStyle} />
          )}
          {routeProfile === "walking" && (
            <Layer {...Layer_CONFIG.WalkLineStyle} />)}
          {routeProfile === "walking" && (
            <Layer {...Layer_CONFIG.CircleStyle} />
          )}
          </Source>
          <Source id="mapillary" type="vector" tiles={[mapillaryTilesUrl]} minzoom={6} maxzoom={14}  >
            <Layer
              {...Layer_CONFIG.MapillaryStyle.Line}
              layout={{
                visibility:"none"
              }}
            />
            <Layer
              {...Layer_CONFIG.MapillaryStyle.Circle}
              layout={{
                visibility:"none"
              }}
            />
          </Source>
        </>
      )}
    </Map>
  );
};

export default MapCanvas;
