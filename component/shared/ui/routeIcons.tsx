import { EndRouteIcon, StartRouteIcon } from '@/utils/exports/app-icons'
import React from 'react'
import Image from 'next/image'
import Line from '@/public/route-line.svg'
import { useAppContext } from '@/lib/context/AppContext'

const RouteIcons = () => {

    const { startMarker, endMarker } = useAppContext()
  return (
    <div className='flex flex-col justify-between py-[0.1rem] relative'>
        <StartRouteIcon
            className={` ${startMarker ? "opacity-1": "opacity-50" }`}
        />
         <Image 
            src={Line}
            alt='Route line'
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2'
         />
        <EndRouteIcon
            className={`absolute bottom-0 opacity ${endMarker ? "opacity-1": "opacity-50" }`}
        />
    </div>
  )
}

export default RouteIcons