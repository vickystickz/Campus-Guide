import MapControlWrapper from "@/component/shared/ui/control";
import { ZoomOutIcon, ZoomInIcon } from "@/utils/exports/app-icons";
import {useMap} from 'react-map-gl';

const ZoomControl = () => {
  const { current:mymap} = useMap();
  return (
    <div className="rounded-full h-fit overflow-clip">
      <MapControlWrapper
        style="rounded-none bg-none"
        onClick={()=>{
            if(!mymap) return
            mymap?.zoomOut()
        }}
      >
        <ZoomOutIcon className="map-control-icon" />
      </MapControlWrapper>
      <hr></hr>
      <MapControlWrapper
        style="rounded-none bg-none"
        onClick={()=>{
            if(!mymap) return
            mymap.zoomIn()
        }}
      >
        <ZoomInIcon className="map-control-icon"/>
      </MapControlWrapper>
    </div>
  );
};

export default ZoomControl;
