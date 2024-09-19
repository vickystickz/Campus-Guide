import { UniversityIcon } from "@/utils/exports/app-icons";
import React from "react";
import { CampusDataType } from "@/utils/campus-data";
import { useAppContext } from "@/lib/context/AppContext";

const Campus = ({ active }: { active: boolean }) => {
  const { selectedCampus, setSelectedCampus, setMaxBounds, setStartMarker, setEndMarker, setRouteInfo, availableCampus } = useAppContext();

  const generateAddress = (campus: CampusDataType) => {
    if(!campus.state) return `${campus.city}, ${campus.country}`;
    return `${campus.city}, ${campus.state}, ${campus.country}`;
  };

  return (
    <div className={`p-4 ${active ? "block" : "hidden"}`}>
      <ul className="md:space-y-6 space-y-4 h-[12rem] pr-2 overflow-auto">
        {availableCampus.map((campus, index) => {
          return (
            <CampusInfo
              active={selectedCampus?.id === campus.id}
              key={index.toString()}
              title={campus.title}
              description={campus.country}
              address={generateAddress(campus)}
              onAction={() => {
                if(campus.id === selectedCampus?.id) {
                  setSelectedCampus(null);
                  setMaxBounds(undefined);
                }else{
                  setSelectedCampus(campus);
                  setStartMarker(null)
                  setEndMarker(null)
                  setRouteInfo(null)
                }
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Campus;

const CampusInfo = ({
  title,
  active,
  description,
  address,
  onAction,
}: {
  active?:boolean;
  title: string;
  description: string;
  address: string;
  onAction?: () => void;
}) => {
  return (
    <li
      className={`flex items-center gap-2.5 cursor-pointer group ${active ? "bg-white p-2 rounded-md shadow-md" : "h-11 "}`}
      onClick={onAction}
    >
      <div className="w-11 h-11 rounded-full flex items-center justify-center bg-purple-50 ">
        <UniversityIcon />
      </div>
      <div className="h-full font-work-sans">
        <h3 className="text-blue-300 md:text-base text-sm  group-hover:text-blue-700">{title}</h3>
        <p className="text-blue-75 text-xs  group-hover:text-purple-100">
          {address}
        </p>
      </div>
    </li>
  );
};
