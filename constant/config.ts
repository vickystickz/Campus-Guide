import { LineLayer } from "mapbox-gl";
import { CarIcon, WalkIcon } from "@/utils/exports/app-icons";
import { SVGProps } from "react";

type APP_CONFIG_TYPE = {
  projectStatus: string;
  percentage: number;
  CUSTOM_ATTRIBUTION: string;
  MAP_CONFIG: {
    MAP_CENTER: number[];
    MAP_STYLE: {
      DEFAULT: string;
      SATELLITE: string;
      DARK: string;
      NAVIGATION_NIGHT: string;
      NAVIGATION_DAY: string;
    };
  };
  TOAST_CONFIG: {
    FEEDBACKS: {
      SUCCESS: {
        title: string;
        message: string;
      };
    };
  };
  TOOLTIP_CONFIG: {
    MAP_ICONS: {
      GEOLOCATION: string;
      ZOOM_IN: string;
      ZOOM_OUT: string;
      BASEMAP: string;
    };
  };

  Layer_CONFIG: {
    LineStyle: LineLayer;
  };
  
  ROUTE_CONFIG: {
    ROUTE_TABS: Array<{
      id: "driving" | "walking" | "cycling";
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }>;
  };
};

const APP_CONFIG: APP_CONFIG_TYPE = {
  projectStatus: "In Progress",
  percentage: 40.6,
  CUSTOM_ATTRIBUTION:
    "Development by YouthMappers. Project led by Victor Ademoyero",

  MAP_CONFIG: {
    MAP_CENTER: [5.210266, 7.250771],
    MAP_STYLE: {
      DEFAULT: "mapbox://styles/mapbox/streets-v11",
      SATELLITE: "mapbox://styles/mapbox/satellite-v9",
      DARK: "mapbox://styles/mapbox/dark-v10",
      NAVIGATION_NIGHT: "mapbox://styles/mapbox/navigation-night-v1",
      NAVIGATION_DAY: "mapbox://styles/mapbox/navigation-day-v1",
    },
  },

  TOAST_CONFIG: {
    FEEDBACKS: {
      SUCCESS: {
        title: "Thank you For the Feeback",
        message: "We're continually improving to enhance your experience.",
      },
    },
  },

  TOOLTIP_CONFIG: {
    MAP_ICONS: {
      GEOLOCATION: "My Location",
      ZOOM_IN: "Zoom In",
      ZOOM_OUT: "Zoom Out",
      BASEMAP: "Change Basemap",
    },
  },

  Layer_CONFIG: {
    LineStyle: {
      id: "route",
      type: "line",
      paint: {
        "line-width": 6,
        "line-color": "#992BF4",
      },
      layout: {
        visibility: "visible", // the layer will always show by default when the map loads
      },
    },
  },

  ROUTE_CONFIG: {
    ROUTE_TABS: [
      {
        id: "driving",
        label: "Car",
        icon: CarIcon,
      },
      {
        id: "walking",
        label: "Walk",
        icon: WalkIcon,
      },
    ],
  },
};

export default APP_CONFIG;
