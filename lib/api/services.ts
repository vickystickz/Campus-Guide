import { DRIVING, WALKING, CYCLING } from "./urls";
import { mapboxDirectionInstance, photonInstance } from "./axios-instance";
import { toast } from "../context/use-toast";

export const getRoute = async (
    start: { lat: number; lon: number },
    end: { lat: number; lon: number },
    routeProfile: "driving" | "walking" | "cycling"
  ) => {
    const ROUTE_PROFILE =
      routeProfile === "driving"
        ? DRIVING
        : routeProfile === "walking"
        ? WALKING
        : CYCLING;
  
    try {
      const response = await mapboxDirectionInstance.get(
        `${ROUTE_PROFILE}${start.lon},${start.lat};${end.lon},${end.lat}?geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      );
      return response.data; // Assuming you want to return the data from the response
    } catch (error) {
        console.log(error)
    }
  };

export const getPlace = async (
  query: string,
  limit = 5,
  geoPosition?: {
    lat: number;
    lon: number;
  },
  osmTag?: string
) => {
  try {
    const response = await photonInstance.get(
      `/?q=${query}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
