"use client"

import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import LoaderImage from "@/public/bg-loader.svg"
import {Progress} from "@nextui-org/react";

type PageLoaderProps = {
  onLoaded: () => void;
}
const PageLoader = ({
onLoaded
}: PageLoaderProps) => {

  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
      if(value === 100) {
        onLoaded();
      }
    }, 500);
  

    return () => clearInterval(interval);
  }, [onLoaded, value]);


  return (
    <div className='flex flex-col items-center justify-center gap-10'>
      <div className=''>
        <Image src={LoaderImage} alt="Campus Guide Logo" priority={true} className="object-fit h-fit w-fit" />
      </div>
      <Progress 
          aria-label="Loading..." 
          value={value}
          classNames={{
            base: "h-[0.5rem] w-[20rem] rounded-lg",
            indicator: "h-full w-full bg-purple-300 rounded-lg",
            track: "h-full w-full bg-purple-50 rounded-lg",
          }}
        /> 
    </div>
  )
}

export default PageLoader