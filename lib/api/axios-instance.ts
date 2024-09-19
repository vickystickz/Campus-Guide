import axios from "axios";
import { MAPBOX_DIRECTION_API, PHOTON_BASE_URL}  from "@/utils/urls";

const mapboxDirectionInstance = axios.create({
    baseURL: MAPBOX_DIRECTION_API,
    headers: {
        "Content-Type": "application/json",
        timeout : 1000,
    },
});


const photonInstance = axios.create({
    baseURL: PHOTON_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        timeout : 1000,
    },
});


export { mapboxDirectionInstance, photonInstance}