import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import CardSkeleton from './CardSkeleton'

export default function ColumnSkeleton() {
  return (
    <Card className='h-full bg-gray-100 w-80 p-3'>
      <Skeleton className='rounded w-full h-10 p-2 mb-2' />
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </Card>
  )
}
