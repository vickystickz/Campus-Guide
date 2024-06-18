import React, {
    createContext,
    useContext,
    useMemo,
    useReducer,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
  } from "react";
  import type {FeatureCollection} from 'geojson';

import APP_CONFIG from "@/constant/config"
import { RouteType } from "@/types/route";
  
  interface AppContextProps {
    baseMap: string;
    route: FeatureCollection;
    setRoute: Dispatch<SetStateAction<FeatureCollection>>;
    routeInfo:RouteType[] | null;
    setRouteInfo:Dispatch<SetStateAction<RouteType[] | null>>;
    setBaseMap: Dispatch<SetStateAction<string>>;
    showMap: boolean;
    setShowMap: Dispatch<SetStateAction<boolean>>;
    mapLoaded: boolean;
    setMapLoaded: Dispatch<SetStateAction<boolean>>;
    viewState: {
        longitude: number,
        latitude: number,
        zoom:number,
        pitch?: number,
        bearing? :number,
        fitBoundsOptions?: {
            padding: number
            maxZoom: number
            minZoom: number
            offset: [number, number]
        },
        bounds?: [[number, number], [number, number]]
    }
    setViewState: Dispatch<SetStateAction< {
        longitude: number,
        latitude: number,
        zoom:number,
        pictch?: number,
        bearing? :number
    }>>;
    setStartMarker: Dispatch<SetStateAction<{
        longitude: number,
        latitude: number
    } | null>>;
    startMarker: {
        longitude: number,
        latitude: number
    } | null;
    setProgressMarker: Dispatch<SetStateAction<{
        longitude: number,
        latitude: number
    } | null>>;
    progressMarker: {
        longitude: number,
        latitude: number
    } | null;
    setEndMarker: Dispatch<SetStateAction<{
        longitude: number,
        latitude: number
    } | null>>
    endMarker: {
        longitude: number,
        latitude: number
    } | null
  }
  
  const AppContext = createContext<AppContextProps | undefined>(undefined);
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  };
  
  interface AppProviderProps {
    children: ReactNode;
  }
  
  const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [baseMap, setBaseMap] = useState<string>(APP_CONFIG.MAP_CONFIG.MAP_STYLE.DEFAULT);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [route, setRoute] = useState<FeatureCollection>({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [],
            },
            properties: null
          },
        ],
      }
    );
    const [routeInfo, setRouteInfo] = useState<RouteType[] | null>(null)
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [interactiveLayerIds, setInteractiveLayerIds] = useState([])
    const [viewState, setViewState] = useState({
        longitude: APP_CONFIG.MAP_CONFIG.MAP_CENTER[0],
        latitude: APP_CONFIG.MAP_CONFIG.MAP_CENTER[1],
        zoom: 7
      });
    const [startMarker, setStartMarker] = useState<{
        longitude: number,
        latitude: number
    } | null>(null) 
    const [endMarker, setEndMarker] = useState<{
        longitude: number,
        latitude: number
    } | null>(null) 
    const [progressMarker, setProgressMarker] = useState<{
        longitude: number,
        latitude: number
    } | null>(null) 

    
  useEffect(()=>{
    if(routeInfo){
      setRoute({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry:routeInfo[0]?.geometry,
            properties: null
          },
        ],
      })
    }
  },[routeInfo, setRoute])




    const value = useMemo(
      () => ({
        baseMap,
        setBaseMap,
        setViewState,
        setStartMarker,
        startMarker,
        viewState,
        setInteractiveLayerIds,
        interactiveLayerIds,
        setProgressMarker,
        progressMarker,
        showMap,
        setShowMap,
        endMarker,
        setEndMarker,
        mapLoaded,
        setMapLoaded,
        route,
        setRoute,
        routeInfo,
        setRouteInfo
      }),
      [baseMap, endMarker, interactiveLayerIds, mapLoaded, progressMarker, route, routeInfo, showMap, startMarker, viewState]
    );
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  };
  
  export default AppProvider;
  