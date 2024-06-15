"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoaderImage from "@/public/bg-loader.svg";
import LoaderMobileImage from "@/public/mobile-bg-loader.svg";

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
      let number = 0
      setValue((v) => (v >= 100 ? 0 : v + (number+20)));

      if (value === 100) {
        onLoaded();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [value, onLoaded]);

  return (
    <div className="flex flex-col items-center justify-center md:gap-8 gap-3.5">
      {showLogo && (
        <>
          <Image
            src={LoaderMobileImage}
            alt="Campus Guide Logo"
            priority={true}
            className="object-fit h-fit w-fit"
          />
        </>
      )}
      <div className="block relative md:w-[20rem] w-[15rem] h-[0.5rem] bg-purple-50 rounded-full overflow-clip">
        <div
          className="absolute top-0 bottom-0 rounded-md bg-purple-200 transition-all ease-in-out duration-200 delay-100"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PageLoader;
