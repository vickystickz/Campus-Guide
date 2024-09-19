import React from "react";
import Button from "@/component/shared/ui/button";
import { Input } from "@/component/shared/ui/input";
import { CloseToastIcon, SearchIcon } from "@/utils/exports/app-icons";
import APP_CONFIG from "@/constant/config";
import { useAppContext } from "@/lib/context/AppContext";
import { CAMPUS_DATA } from "@/utils/campus-data";

const Tabs = () => {
  const [showSearch, setShowSearch] = React.useState(false);
  const { TABS } = APP_CONFIG;
  const { activeTab, handleActiveTab, handleFilterCampus, setAvailableCampus } = useAppContext();

  const showCampusSearchIcon = activeTab === "campus";
  return (
    <div className="flex items-center relative justify-between py-3 px-5 gap-2 border-t-[1px] md:border-b-[1px] border-blue-50"> 
      <div className="flex items-center gap-3 font-work-sans transition-all delay-150 ease-in-out">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            icon={<tab.icon />}
            className={`text-blue-75 py-2 px-2.5 text-sm hover:text-purple-300 border-white w-fit font-medium
                ${
                  activeTab === tab.id
                    ? "text-purple-300 shadow-btn border-purple-50"
                    : ""
                }
                `}
            onClick={() => handleActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      {showCampusSearchIcon && (
        <div
          className={`h-9 transition-all delay-150 ease-in-out transform ${
            showSearch ? "absolute right-4 left-4" : "w-9"
          } z-20 rounded-full bg-white border-blue-50 flex items-center justify-center border-[1px] overflow-clip`}
        >
          {showSearch && (
            <Input
              placeholder="Search Campus"
              className="bg-white w-full h-full focus-visible:ring-none focus-visible:ring-0 "
              onChange={(e) => 
                handleFilterCampus(e.target.value)
              }
            />
          )}

          <div
            className="h-full w-9 flex items-center justify-center cursor-pointer transition-all delay-150 ease-in-outhover:text-purple-300"
            onClick={() => {setShowSearch(!showSearch); setAvailableCampus(CAMPUS_DATA)}}
          >
            {showSearch ? (
              <CloseToastIcon className="w-5 h-5"
               />
            ) : (
              <SearchIcon />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
