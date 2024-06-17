import { useQuery } from "@tanstack/react-query";
import { getPlace, getRoute } from "@/lib/api/services";

// this is a custom hook that uses the useQuery hook from react-query to fetch route data
const useGetRoute = (
    start: { lat: number; lon: number } | null,
    end: { lat: number; lon: number } | null,
    routeProfile: "driving" | "walking" | "cycling"
  ) => {
    return useQuery({
      queryKey: ["route", start, end, routeProfile],
      queryFn: () => {
        if (!start || !end) {
          return Promise.reject(new Error("Start or end location is not available"));
        }
        return getRoute(start, end, routeProfile);
      },
      enabled: !!start && !!end,
    });
  };
  

// this is a custom hook that uses the useQuery hook from react-query to fetch place data
const useGetPlace = ( query: string, limit = 5, geoPosition?: { lat: number; lon: number }, osmTag?: string ) => {
    return useQuery({
        queryKey: ["place", query, limit, geoPosition, osmTag],
        queryFn: () => getPlace(query, limit, geoPosition, osmTag),
        enabled: !!query,
    });
};


export { useGetRoute, useGetPlace };