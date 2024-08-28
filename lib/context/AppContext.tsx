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
import type { FeatureCollection } from "geojson";
import {LngLatBoundsLike} from "mapbox-gl";

import APP_CONFIG from "@/constant/config";
import { RouteType, ManeuverType } from "@/types/route";
import { CampusDataType } from "@/utils/campus-data";

interface AppContextProps {
  baseMap: string;
  route: FeatureCollection;
  activeTab: "campus" | "direction";
  setRoute: Dispatch<SetStateAction<FeatureCollection>>;
  routeInfo: RouteType[] | null;
  setRouteInfo: Dispatch<SetStateAction<RouteType[] | null>>;
  routeProfile: "driving" | "walking" | "cycling";
  setRouteProfile: Dispatch<SetStateAction<"driving" | "walking" | "cycling">>;
  mapillaryImageId: string | null;
  setMapillaryImageId: Dispatch<SetStateAction<string | null>>;
  setBaseMap: Dispatch<SetStateAction<string>>;
  setActiveTab: Dispatch<SetStateAction<"campus" | "direction">>;
  showMap: boolean;
  setShowMap: Dispatch<SetStateAction<boolean>>;
  mapLoaded: boolean;
  setMapLoaded: Dispatch<SetStateAction<boolean>>;
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch?: number;
    bearing?: number;
    fitBoundsOptions?: {
      padding: number;
      maxZoom: number;
      minZoom: number;
      offset: [number, number];
    };
    bounds?: [[number, number], [number, number]];
  };
  setViewState: Dispatch<
    SetStateAction<{
      longitude: number;
      latitude: number;
      zoom: number;
      pictch?: number;
      bearing?: number;
    }>
  >;
  setStartMarker: Dispatch<
    SetStateAction<{
      longitude: number;
      latitude: number;
    } | null>
  >;
  setCurrentLocation: Dispatch<
    SetStateAction<{
      longitude: number;
      latitude: number;
    } | null>
  >;
  startMarker: {
    longitude: number;
    latitude: number;
  } | null;
  setProgressMarker: Dispatch<
    SetStateAction<{
      longitude: number;
      latitude: number;
    } | null>
  >;
  progressMarker: {
    longitude: number;
    latitude: number;
  } | null;
  setEndMarker: Dispatch<
    SetStateAction<{
      longitude: number;
      latitude: number;
    } | null>
  >;
  currentLocation: {
    longitude: number;
    latitude: number;
  } | null;
  endMarker: {
    longitude: number;
    latitude: number;
  } | null;
  selectedStep: ManeuverType | { location: number[]; instruction: string } | null;
  setSelectedStep: Dispatch< SetStateAction<ManeuverType | { location: number[]; instruction: string } | null>>
  setSelectedCampus: Dispatch<SetStateAction<CampusDataType | null>>;
  selectedCampus: CampusDataType | null;
  maxBounds: LngLatBoundsLike | undefined;
  setMaxBounds: Dispatch<SetStateAction<LngLatBoundsLike | undefined>>;
  handleActiveTab: (tab: "campus" | "direction") => void;
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
  const [baseMap, setBaseMap] = useState<string>(
    APP_CONFIG.MAP_CONFIG.MAP_STYLE.DEFAULT
  );
  const [showMap, setShowMap] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"campus" | "direction">("campus");
  const [route, setRoute] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
        properties: null,
      },
    ],
  });
  const [routeProfile, setRouteProfile] = useState<
    "driving" | "walking" | "cycling"
  >("driving");
  const [routeInfo, setRouteInfo] = useState<RouteType[] | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [interactiveLayerIds, setInteractiveLayerIds] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: APP_CONFIG.MAP_CONFIG.MAP_CENTER[0],
    latitude: APP_CONFIG.MAP_CONFIG.MAP_CENTER[1],
    zoom: 7,
  });
  const [maxBounds, setMaxBounds] = useState<LngLatBoundsLike | undefined>(undefined);
  const [startMarker, setStartMarker] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [endMarker, setEndMarker] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [progressMarker, setProgressMarker] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [selectedStep, setSelectedStep] = useState<
 {
    location: number[];
    instruction: string;
  } |  ManeuverType | null>(null);

  //Layers
  const [mapillaryImageId, setMapillaryImageId] = useState<string | null>(null);
  const [selectedCampus, setSelectedCampus] = useState< CampusDataType | null>(null);

  useEffect(() => {
    if (routeInfo) {
      console.log(routeInfo);
      setRoute({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: routeInfo[0]?.geometry,
            properties: null,
          },
        ],
      });
    } else {
      setRoute({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [],
            },
            properties: null,
          },
        ],
      });
    }
  }, [routeInfo, setRoute]);


  const handleActiveTab = (tab: "campus" | "direction") => {
    setActiveTab(tab);
  }

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
      setRouteInfo,
      routeProfile,
      setRouteProfile,
      mapillaryImageId,
      setMapillaryImageId,
      currentLocation,
      setCurrentLocation,
      selectedStep,
      setSelectedStep,
      activeTab,
      setActiveTab,
      handleActiveTab,
      selectedCampus,
      setSelectedCampus,
      maxBounds,
      setMaxBounds
    }),
    [
      baseMap,
      currentLocation,
      activeTab,
      endMarker,
      interactiveLayerIds,
      mapLoaded,
      mapillaryImageId,
      progressMarker,
      route,
      routeInfo,
      routeProfile,
      showMap,
      startMarker,
      viewState,
      selectedStep,
      selectedCampus,
      maxBounds
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
