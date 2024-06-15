import React from 'react'
import type { Metadata } from "next";
import { openGraphImage } from '@/app/shared-metadata'


export const metadata: Metadata = {
    title: "Map | Campus Guide",
    description:
      "Navigation around your campus easily",
      openGraph: {
        ...openGraphImage,
        title: 'Map',
      },
  };
  

const WebMapLayout = ({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) => {
  return (
    <>
        {children}
    </>
  )
}

export default WebMapLayout