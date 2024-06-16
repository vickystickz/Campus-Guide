import Button from "@/component/shared/ui/button";
import { RouteIcon } from "@/utils/exports/app-icons";
import CG from "@/assets/icons/CG";
import { useAppContext } from "@/lib/context/AppContext";
import APP_CONFIG from "@/constant/config";

const TopHeader = () => {
  const { MAP_CONFIG } = APP_CONFIG;
  const { baseMap } = useAppContext();
  return (
    <div className="absolute top-6 lg:px-8 md:px-4 px-4 w-full flex items-center justify-between">
      <div>
        <Button
            href="/"
            className={`block p-0 ${baseMap === MAP_CONFIG.MAP_STYLE.DEFAULT ? "text-blue-300" : "text-white"}`}
        >
             <CG />
        </Button>
       
      </div>
      <Button
        href="/"
        className="bg-purple-300 font-medium md:text-p-base text-p-xs text-white"
        icon={<RouteIcon />}
        iconPosition="right"
      >
        <span>Contribute</span>
      </Button>
    </div>
  );
};

export default TopHeader;
