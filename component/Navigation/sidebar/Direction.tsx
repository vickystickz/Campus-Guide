import { Input } from '@/component/shared/ui/input'
import React from 'react'
import DirectionSearch from './DirectionSearch'
import RouteDetails from './RouteDetails'

const Direction = ({
  active
}: {
  active: boolean
}) => {

  return (
    <div className={`${active ? "block": "hidden"}`}>
      <div className='p-4'>
       <DirectionSearch />
      </div>
       <RouteDetails />
    </div>
  )
}

export default Direction