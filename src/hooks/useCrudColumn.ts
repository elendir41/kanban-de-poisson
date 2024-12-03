import { useServiceContext } from "@/context/ServiceContext";
import useKanbanStore from "@/stores/kanban-store";
import { useToast } from "./use-toast";
import Column from "@/models/column.type";

export default function useCrudColumn() {
  const { columnService } = useServiceContext();
  const currentBoardId = useKanbanStore((state) => state.currentBoardId);

  const addColumn = useKanbanStore((state) => state.addColumn);
  const deleteColumn = useKanbanStore((state) => state.deleteColumn);

  const { toast } = useToast();

  const onUpdate = async (column: Column) => {
    const response = await columnService.updateColumn(column);
    if (response.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de mettre à jour la colonne",
        variant: "destructive",
      });
    } else {
      return response.data;
    }
  };

  const onDelete = async (id: string) => {
    const response = await columnService.deleteColumn(id);
    if (response.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de supprimer la colonne",
        variant: "destructive",
      });
    } else {
      deleteColumn(id);
    }
  };

  const onCreate = async (name: string) => {
    const response = await columnService.createColumn(currentBoardId, name);
    if (response.data) {
      addColumn(response.data);
    } else {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de créer la colonne",
        variant: "destructive",
      });
    }
  };

  return { onUpdate, onDelete, onCreate };
}
