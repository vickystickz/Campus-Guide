import Button from "@/component/shared/ui/button";
import Image from "next/image";
import { RouteIcon } from "@/utils/exports/app-icons";
import CG from "@/assets/icons/CG";

const TopHeader = () => {
  return (
    <div className="absolute top-6 lg:px-8 md:px-4 px-4 w-full flex items-center justify-between">
      <div>
        <Button
            href="/"
            className="block p-0 text-blue-300"
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
