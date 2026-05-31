import axios from "axios";
import {
  MAPBOX_DIRECTION_API,
  PHOTON_BASE_URL,
  CAMPUS_GUIDE_API_URL,
} from "@/utils/urls";

const mapboxDirectionInstance = axios.create({
  baseURL: MAPBOX_DIRECTION_API,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

const photonInstance = axios.create({
  baseURL: PHOTON_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

const campusGuideInstance = axios.create({
  baseURL: CAMPUS_GUIDE_API_URL,
  timeout: 30000, // 30 seconds for file uploads
  headers: {
    "Content-Type": "application/json",
  },
});

export { mapboxDirectionInstance, photonInstance, campusGuideInstance };
