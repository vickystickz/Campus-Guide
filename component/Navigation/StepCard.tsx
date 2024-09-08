import React from "react";
import {} from "@/constant/config";
import {
  getFormattedDistance,
  getFormattedEstimatedTime,
} from "@/utils/navigation";
import {
  KeepLeftIcon,
  KeepRightIcon,
  TurnLeftIcon,
  TurnRightIcon,
  ExitLeftIcon,
  ExitRightIcon,
  UturnRightIcon,
  UturnleftIcon,
  ContinueStraightIcon,
  ArriveLeftIcon,
  ArriveRightIcon,
  SlightRightIcon,
  SlightLeftIcon,
  ForkIcon,
  ForkLeftIcon,
  ForkRightIcon,
  ForkSlightRightIcon,
  ForkSlightLeftIcon,
} from "@/utils/exports/app-icons";
import { ManeuverType, StepType } from "@/types/route";
import { Timer } from "lucide-react";
import { useAppContext } from "@/lib/context/AppContext";

const StepCard = ({
  intersections,
  maneuver,
  name,
  mode,
  duration,
  distance,
  driving_side,
}: StepType) => {
  const {setSelectedStep} = useAppContext();
  // Get the icon for the maneuver
  const getIcon = (
    type: string,
    modifier: string | undefined,
    driving_side: string
  ) => {
    switch (type) {
      case "turn":
        if (modifier === "left") return <TurnLeftIcon className="h-5 w-5" />;
        if (modifier === "slight left")
          return <SlightLeftIcon className="h-5 w-5" />;
        if (modifier === "slight right")
          return <SlightRightIcon className="h-5 w-5" />;
        if (modifier === "right") return <TurnRightIcon className="h-5 w-5" />;
        break;
      case "roundabout":
        if (modifier === "slight left")
          return <SlightLeftIcon className="h-5 w-5" />;
        if (modifier === "slight right")
          return <SlightRightIcon className="h-5 w-5" />;
        if (modifier === "left") return <TurnLeftIcon className="h-5 w-5" />;
        if (modifier === "right") return <TurnRightIcon className="h-5 w-5" />;
      case "fork":
        if (modifier === "left") return <ForkLeftIcon className="h-5 w-5" />;
        if (modifier === "slight left")
          return <ForkSlightLeftIcon className="h-5 w-5" />;
        if (modifier === "slight right")
          return <ForkSlightRightIcon className="h-5 w-5" />;
        if (modifier === "right") return <ForkRightIcon className="h-5 w-5" />;
        break;
      case "end of road":
        if (modifier === "left") return <ExitLeftIcon className="h-5 w-5" />;
        if (modifier === "right") return <ExitRightIcon className="h-5 w-5" />;
        break;
      case "arrive":
        if (driving_side === "left")
          return <ArriveLeftIcon className="h-5 w-5" />;
        if (driving_side === "right")
          return <ArriveRightIcon className="h-5 w-5" />;
        break;
      case "exit":
        if (modifier === "left") return <ExitLeftIcon className="h-5 w-5" />;
        if (modifier === "right") return <ExitRightIcon className="h-5 w-5" />;
        break;
      case "continue":
        if (modifier == "uturn") {
          if (driving_side === "right")
            return <UturnleftIcon className="h-5 w-5" />;
          if (driving_side === "left")
            return <UturnRightIcon className="h-5 w-5" />;
        }
        return <ContinueStraightIcon />;
      case "keep":
        if (modifier === "left") return <KeepLeftIcon className="h-5 w-5" />;
        if (modifier === "right") return <KeepRightIcon className="h-5 w-5" />;
        break;
      default:
        return <ContinueStraightIcon className="h-5 w-5" />;
    }
  };

  const Arrived = maneuver.type === "arrive";

  const handleStepClick = (maneuver: ManeuverType) => {
    setSelectedStep({
      location: [maneuver.location[0], maneuver.location[1]],
      instruction: maneuver.instruction,
    });
  }
  return (
    <li className="bg-white bg-cg-white h-fit cursor-pointer"
      onClick={()=>handleStepClick(maneuver)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-slate-300">
            {getIcon(maneuver.type, maneuver.modifier, driving_side)}
          </div>
          <div className="">
            <h3 className="text-p2 font-bold font-work-sans text-cg-blue-500 mb-1">
              {name}
            </h3>
            <p className="text-xs text-cg-blue-400 w-full">
              {maneuver.instruction}
            </p>
            <p className="text-xs text-blue-400 font-work-sans font-semibold w-full">
              {Arrived ? "Arrived" : `in ${getFormattedDistance(distance)}`}
            </p>
          </div>
        </div>
      </div>
      {!Arrived && <hr />}
      {!Arrived && (
        <div className="py-2 flex gap-1 px-4">
          <Timer className="h-4 w-4 text-blue-100" />
          <p className="text-xs text-blue-100 font-work-sans mt-[0.04rem] w-full">
            {getFormattedEstimatedTime(duration)}
          </p>
        </div>
      )}
    </li>
  );
};

export default StepCard;
