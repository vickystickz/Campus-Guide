import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RouteInfoSkeleton = ({
  height = 30,
  count = 1
}) => {
  return (
    <div>
      <Skeleton height={height}  count={count} className='mt-3'/>
      <Skeleton height={height}  count={count} className='mt-3'/>
    </div>
    
  )
}

export default RouteInfoSkeleton