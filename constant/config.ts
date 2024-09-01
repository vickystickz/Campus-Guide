import { LineLayer, CircleLayer, FillLayer } from "mapbox-gl";
import {
  CarIcon,
  WalkIcon,
  DirectionTabIcon,
  CampusTabIcon,
  ContributeIcon,
  ShareRouteIcon,
  FeedbackIcon,
  WhatsAppIcon,
  MailIcon,
  XIcon,
} from "@/utils/exports/app-icons";
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
    MAP_TOP_MENU: Array<{
      id: string;
      value: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }>;
  };
  TABS: Array<{
    id: "campus" | "direction";
    label: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }>;
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
    MAP_TOP_MENU: {
      MENU: string;
      APPEARANCE: string;
    };
  };

  Layer_CONFIG: {
    DriveLineStyle: LineLayer;
    CircleStyle: CircleLayer;
    WalkLineStyle: LineLayer;
    BoundaryStyle: {
      FillLayer: FillLayer;
      LineLayer: LineLayer;
    };
    MapillaryStyle: {
      Line: LineLayer;
      Circle: CircleLayer;
    };
  };

  ROUTE_CONFIG: {
    ROUTE_TABS: Array<{
      id: "driving" | "walking" | "cycling";
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }>;
  };

  SHARE_ROUTE_CONFIG: Array<{
      id: "mail" | "x" | "whatsapp";
      href: string;
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }>;
};

const APP_CONFIG: APP_CONFIG_TYPE = {
  projectStatus: "In Progress",
  percentage: 60,
  CUSTOM_ATTRIBUTION:
    "Development by YouthMappers. Project led by Victor Ademoyero & Olanrewaju Micheal",

  MAP_CONFIG: {
    MAP_CENTER: [5.210266, 7.250771],
    MAP_STYLE: {
      DEFAULT: "mapbox://styles/mapbox/streets-v11",
      SATELLITE: "mapbox://styles/mapbox/satellite-v9",
      DARK: "mapbox://styles/mapbox/dark-v10",
      NAVIGATION_NIGHT: "mapbox://styles/mapbox/navigation-night-v1",
      NAVIGATION_DAY: "mapbox://styles/mapbox/navigation-day-v1",
    },
    MAP_TOP_MENU: [
      {
        id: "contribute",
        value: "Contribute",
        icon: ContributeIcon,
      },
      {
        id: "share",
        value: "Share route",
        icon: ShareRouteIcon,
      },
      {
        id: "feedback",
        value: "Feedback",
        icon: FeedbackIcon,
      },
    ],
  },

  TABS: [
    {
      id: "campus",
      label: "Campus",
      icon: CampusTabIcon,
    },
    {
      id: "direction",
      label: "Direction",
      icon: DirectionTabIcon,
    },
  ],

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
    MAP_TOP_MENU: {
      MENU: "Menu",
      APPEARANCE: "toogle",
    },
  },

  Layer_CONFIG: {
    DriveLineStyle: {
      id: "route-car",
      type: "line",
      paint: {
        "line-width": 6,
        "line-color": "#992BF4",
      },
      layout: {
        visibility: "visible", // the layer will always show by default when the map loads
      },
      source: ""
    },
    WalkLineStyle: {
      id: "route-walk",
      type: "line",
      paint: {
        "line-width": 2,
        "line-color": "#992BF4",
      },
      layout: {
        visibility: "visible", // the layer will always show by default when the map loads
      },
      source: ""
    },
    CircleStyle: {
      id: "route-circle-walk",
      type: "circle",
      paint: {
        "circle-radius": 2,
        "circle-color": "#992BF4",
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
      layout: {
        visibility: "visible", // the layer will always show by default when the map loads
      },
      source: ""
    },
    BoundaryStyle: {
      FillLayer: {
        id: "FUTA-fill",
        type: "fill",
        paint: {
          "fill-color": "#F3E6FE",
          "fill-opacity": 0.3,
        },
        source: ""
      },
      LineLayer: {
        id: "FUTA-line",
        type: "line",
        paint: {
          "line-color": "#510094",
          "line-width": 2,
        },
        source: ""
      },
    },
    MapillaryStyle: {
      Circle: {
        id: "mapillary",
        type: "circle",
        source: "mapillary",
        "source-layer": "sequence",
        paint: {
          "circle-radius": 5,
          "circle-color": "rgb(53, 175, 109)",
          "circle-stroke-width": 1,
          "circle-stroke-color": "rgb(34, 139, 84)",
        },
      },
      Line: {
        id: "mapillary-lines",
        type: "line",
        source: "mapillary",
        "source-layer": "sequence",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "rgb(53, 175, 109)",
          "line-opacity": 0.6,
          "line-width": 2,
        },
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
  SHARE_ROUTE_CONFIG: [
    {
      id: "whatsapp",
      href: "https://api.whatsapp.com/send?text=Check out this link:",
      label: "Whatsapp",
      icon: WhatsAppIcon,
    },
    {
      id: "x",
      href: "https://twitter.com/intent/tweet?text=Check%20out%20this%20link!%20",
      label: "X",
      icon: XIcon,
    },
    {
      id: "mail",
      href:"mailto:someone@example.com?subject=Check%20this%20out&body=Here%20is%20the%20link%20you%20requested:%20",
      label: "Mail",
      icon: MailIcon,
    },
  ],
};

export default APP_CONFIG;
