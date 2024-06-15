import { useRef, useState } from "react";
import { MAPBOX_TOKEN } from "@/utils/urls";
import Map, {AttributionControl} from 'react-map-gl';
import { useAppContext } from '@/lib/context/AppContext'
import MapControl from "@/component/Navigation/MapControl";
import Markers from "@/component/Navigation/map-components/Markers";
import APP_CONFIG from "@/constant/config";

const MapCanvas = () => {
  const mapContainer = useRef(null);
  const { CUSTOM_ATTRIBUTION} = APP_CONFIG

  const {
    baseMap,
    viewState,
    mapLoaded,
    setMapLoaded
  } = useAppContext()


  return (
      <Map
        ref={mapContainer}
        id="mymap"
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewState}
        mapStyle={baseMap}
        onLoad={()=>{
          setMapLoaded(!mapLoaded)
        }}
        attributionControl={false}
        style={{
          width: '100%',
          height: '100%'
        }}

      >
        <AttributionControl compact={true} customAttribution={CUSTOM_ATTRIBUTION} />
        {mapLoaded && <MapControl />}
        <Markers />
      </Map>
  );
};

export default MapCanvas;
