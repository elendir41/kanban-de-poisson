import { useServiceContext } from "@/context/ServiceContext";
import useKanbanStore from "@/stores/kanban-store";
import { useEffect, useState } from "react";

export default function useFetchAllKanban() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setKanbanList = useKanbanStore((state) => state.setKanbanList);

  const { kanbanService } = useServiceContext();

  useEffect(() => {
    async function fetchKanban() {
      try {
        const kanban = await kanbanService.getAllBoards();
        if (kanban.error) {
          setError(kanban.error.message);
          setIsLoading(false);
          return;
        }
        setKanbanList(kanban.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue lors du chargement du tableau");
        setIsLoading(false);
      }
    }
    fetchKanban();
  }, []);

  return { isLoading, error };
}
