import { useServiceContext } from "@/context/ServiceContext";
import useKanbanStore from "@/stores/kanban-store";
import { useEffect, useState } from "react";

export default function useFetchKanban(boardId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setCurrentBoardId = useKanbanStore((state) => state.setCurrentBoardId);
  const setColumns = useKanbanStore((state) => state.setColumns);

  const { kanbanService } = useServiceContext();

  useEffect(() => {
    setCurrentBoardId(boardId);
    
    async function fetchKanban() {
      try {
        const kanban = await kanbanService.getBoard(boardId);
        if (kanban.error) {
          setError(kanban.error.message);
          setIsLoading(false);
          return;
        }
        setColumns(kanban.data.columns);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue lors du chargement du tableau");
        setIsLoading(false);
      }
    }
    fetchKanban();
  }, [boardId]);

  return { isLoading, error };
}
