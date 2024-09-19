import { useEffect, useState } from "react";
import CG from "@/assets/icons/CG";
import Button from "@/component/shared/ui/button";
import Tabs from "@/component/Navigation/sidebar/Tabs";
import { useAppContext } from "@/lib/context/AppContext";
import { TABS_ID } from "@/constant/enum";
import { LoveIcon } from "@/utils/exports/app-icons";
import Direction from "@/component/Navigation/sidebar/Direction";
import Campus from "@/component/Navigation/sidebar/Campus";

const SideBar = () => {
  const {
    activeTab
  } = useAppContext();

  const [showSidebar, setShowSidebar] = useState(true);

  const handleHideSidebar = () => {

  }
  

  return (
    <aside className="md:order-1 absolute bottom-0  bg-cg-whitedark order-last w-full md:w-[24.5rem] h-fit z-40 border-r-2 border-blue-50 md:h-full flex flex-col">
      <div
        className="md:hidden flex items-center justify-center py-2 hover:cursor-pointer"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <span className={` ${showSidebar? "bg-neutral-400": "bg-neutral-500"} rounded-full h-[0.3rem] w-[4rem]`}></span>
      </div>
      {/* Top Sidebar Header */}
      <section className="h-fit w-full md:order-first order-last">
        <div className="md:block hidden md:border-0 border-b-[1px] py-4 px-5 border-blue-50">
          <Button href="/" className={`p-0 text-blue-300`}>
            <CG />
          </Button>
        </div>
        {/* Tabs */}
        <Tabs />
      </section>


      {/* Sidebar Body */}
      <section className={`flex-auto flex flex-col w-full transition-all duration-300 ease-in-out  ${showSidebar? " max-h-[calc(100vh-2rem)] opacity-100 transform translate-y-0": "max-h-0 hidden opacity-0 transform translate-y-full overflow-hidden"}`}>
        {/* Shows based on whihc Tab is active */}
        <div className="flex-auto bg-cg-whitedark">
          <Campus active={activeTab === TABS_ID.CAMPUS} />
          <Direction active={activeTab === TABS_ID.DIRECTION} />
        </div>
        {/* Footer:  Not available for Mobile View */}
        <div className="hidden h-fit md:flex items-center gap-2 py-2 bg-cg-whitedark justify-center">
          <span className=" text-center text-xs">Built with </span>
          <LoveIcon className="w-3 h-3" />
        </div>
      </section>
    </aside>
  );
};

export default SideBar;
