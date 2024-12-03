import { Skeleton } from '../ui/skeleton'
import CardSkeleton from './CardSkeleton'

export default function ColumnSkeleton() {
  return (
    <div className='h-full rounded border border-black p-3'>
      <Skeleton className='rounded w-full h-10 p-2 mb-2' />
      <div className='flex flex-col gap-2'>
        {Array.from({ length: 3 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
