import React from "react";
import Button from "@/component/shared/ui/button";
import APP_CONFIG from "@/constant/config";
import { useAppContext } from "@/lib/context/AppContext";

const RouteTab = () => {
  const { ROUTE_CONFIG } = APP_CONFIG;
  const { routeProfile, setRouteProfile } = useAppContext();

  return (
    <div className="flex items-center gap-6">
      {
        ROUTE_CONFIG.ROUTE_TABS.map((tab) => (
          <Button
            key={tab.id}
            className={`${routeProfile === tab.id ? "bg-purple-200 text-white" : "bg-none text-blue-100"} hover:gap-2.5 transition-all px-3.5 gap-2.5 font-sora py-2 w-fit font-medium md:text-s-sm text-p-xs`}
            icon={<tab.icon />}
            iconPosition="left"
            onClick={() => setRouteProfile(tab.id)}
          >
            <span>{tab.label}</span>
          </Button>
        ))
      }
    </div>
  );
};

export default RouteTab;
