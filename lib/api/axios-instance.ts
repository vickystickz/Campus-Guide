import axios from "axios";

const mapboxDirectionInstance = axios.create({
    baseURL: "https://api.mapbox.com/directions/v5",
    headers: {
        "Content-Type": "application/json",
        timeout : 1000,
    },
});


const photonInstance = axios.create({
    baseURL: "https://photon.komoot.io/api",
    headers: {
        "Content-Type": "application/json",
        timeout : 1000,
    },
});


export { mapboxDirectionInstance, photonInstance}