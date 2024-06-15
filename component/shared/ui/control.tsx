import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type MapControlWrapperType = {
  children: ReactNode;
  activateControl?: boolean;
  style?: string;
  onClick?: () => void;
};

const MapControlWrapper = ({ children, style, onClick, activateControl }: MapControlWrapperType) => {
  return (
    <div
      className={cn(
        "bg-white shadow-icon md:w-[3.5rem] md:h-[3.5rem] w-[2.75rem] h-[2.75rem] hover:text-cg-white hover:bg-blue-200 transition-all delay-150 duration-150 ease-in-out text-blue-200 rounded-full flex items-center justify-center cursor-pointer",
        style,
        activateControl && "bg-blue-200 text-cg-white"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MapControlWrapper;   
