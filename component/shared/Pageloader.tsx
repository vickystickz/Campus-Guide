"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoaderImage from "@/public/bg-loader.svg";

type PageLoaderProps = {
  showLogo?: boolean;
  onLoaded: () => void;
};
const PageLoader = ({ showLogo, onLoaded }: PageLoaderProps) => {
  
  // states for percentage Value
  const [value, setValue] = useState(0);

  // Updates Value based on Set Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
      if (value === 100) {
        onLoaded();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [value, onLoaded]);


  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {showLogo && (
        <Image
          src={LoaderImage}
          alt="Campus Guide Logo"
          priority={true}
          className="object-fit h-fit w-fit"
        />
      )}
      <div className="block relative w-[20rem] h-[0.5rem] bg-purple-50 rounded-full overflow-clip">
        <div
          className="absolute top-0 bottom-0 bg-purple-200 transition-all ease-in-out duration-200 delay-100"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PageLoader;
