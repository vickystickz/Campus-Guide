import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RouteInfoSkeleton = () => {
  return (
    <div>
      <Skeleton height={30}  count={1} className='mt-3'/>
      <Skeleton height={30}  count={1} className='mt-3'/>
    </div>
    
  )
}

export default RouteInfoSkeleton