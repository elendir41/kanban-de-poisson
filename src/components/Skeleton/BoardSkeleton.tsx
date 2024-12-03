import ColumnSkeleton from './ColumnSkeleton'

export default function BoardSkeleton() {
  return (
    <div className='m-3 flex w-full gap-3'>
      {Array.from({ length: 2 }).map((_, index) => (
        <ColumnSkeleton key={index} />
      ))}
    </div>
  )
}
