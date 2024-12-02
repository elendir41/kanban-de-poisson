import KanbanCardSkeleton from "./KanbanCardSkeleton";

export default function KanbanListSkeleton() {
  return (
    <div className="p-2 gap-2 flex flex-wrap">
      {Array.from({ length: 3 }).map((_, index) => (
        <KanbanCardSkeleton key={index} />
      ))}
    </div>
  )
}
