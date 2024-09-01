import React from "react";
import Button from "@/component/shared/ui/button";
import APP_CONFIG from "@/constant/config";
import { useAppContext } from "@/lib/context/AppContext";

const RouteTab = () => {
  const { ROUTE_CONFIG } = APP_CONFIG;
  const { routeProfile, setRouteProfile } = useAppContext();

  return (
    <div className="flex items-center p-4 bg-white gap-6">
      {ROUTE_CONFIG.ROUTE_TABS.map((tab) => (
        <Button
          key={tab.id}
          className={`${
            routeProfile === tab.id
              ? "bg-purple-200 text-white"
              : "bg-blue-50 text-blue-200"
          } hover:gap-2.5 flex items-center justify-center  transition-all px-3.5 gap-2.5 font-sora p-3 rounded-full font-medium md:text-s-sm text-p-xs`}
          onClick={() => setRouteProfile(tab.id)}
        >
          <tab.icon className="h-6 w-6" />
        </Button>
      ))}
    </div>
  );
};

export default RouteTab;

export const RouteProfileActiveIcon = ({
  routeProfile,
}: {
  routeProfile: "driving" | "walking" | "cycling";
}) => {
  const { ROUTE_CONFIG } = APP_CONFIG;

  const activeRouteProfile = ROUTE_CONFIG.ROUTE_TABS.find(
    (tab) => tab.id === routeProfile
  );

  return (
    <div
      className="p-3 bg-purple-200 text-white rounded-full w-fit"
      key={activeRouteProfile?.id}
    >
      {activeRouteProfile && <activeRouteProfile.icon className="h-6 w-6" />}
    </div>
  );
};
