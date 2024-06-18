export type RouteData = {
    routes: RouteType[];
    waypoints: Waypoint[];
    code: string;
    uuid: string;
  }
  
 export type RouteType = {
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
    legs: Leg[];
    geometry: Geometry;
  }
  
  interface Leg {
    via_waypoints: any[];
    admins: Admin[];
    weight: number;
    duration: number;
    steps: Step[];
    distance: number;
    summary: string;
  }
  
  interface Admin {
    iso_3166_1_alpha3: string;
    iso_3166_1: string;
  }
  
  interface Step {
    intersections: Intersection[];
    maneuver: Maneuver;
    name: string;
    duration: number;
    distance: number;
    driving_side: string;
    weight: number;
    mode: string;
    geometry: Geometry;
  }
  
  interface Intersection {
    entry: boolean[];
    bearings: number[];
    duration?: number;
    turn_weight?: number;
    turn_duration?: number;
    mapbox_streets_v8: MapboxStreetsV8;
    is_urban: boolean;
    admin_index: number;
    out: number;
    weight?: number;
    geometry_index: number;
    location: number[];
    in?: number;
  }
  
  interface MapboxStreetsV8 {
    class: string;
  }
  
  interface Maneuver {
    type: string;
    instruction: string;
    bearing_after: number;
    bearing_before: number;
    location: number[];
    modifier?: string;
  }
  
  interface Geometry {
    coordinates: number[][];
    type: "LineString";
  }
  
  interface Waypoint {
    distance: number;
    name: string;
    location: number[];
  }
  