import useFetchAllKanban from "@/hooks/useFetchAllKanban";
import KanbanList from "@/components/KanbanList";
import KanbanListSkeleton from "@/components/Skeleton/KanbanListSkeleton";

export default function Home() {
  const { isLoading, error } = useFetchAllKanban();

  if (isLoading) {
    return <KanbanListSkeleton />;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return <KanbanList />;
}
