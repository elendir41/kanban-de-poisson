import { useServiceContext } from "@/context/ServiceContext";
import useKanbanStore from "@/stores/kanban-store";
import { useToast } from "./use-toast";
import ColumnDto from "@/models/dto/columnDto.type";

export default function useCrudKanban() {
  const { kanbanService, columnService } = useServiceContext();
  const kanbanList = useKanbanStore((state) => state.kanbanList);
  const setKanbanList = useKanbanStore((state) => state.setKanbanList);
  const addColumn = useKanbanStore((state) => state.addColumn);
  const { toast } = useToast();

  const onUpdate = async (id: string, name: string) => {
    const response = await kanbanService.updateBoard(id, name);
    if (response.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de mettre à jour le kanban",
        variant: "destructive",
      });
      return;
    }

    const updatedKanbanList = kanbanList.map((kanban) => {
      if (kanban.id === id) {
        return { ...kanban, name };
      }
      return kanban;
    });
    setKanbanList(updatedKanbanList);
    return response.data.name;
  };

  const onDelete = async (id: string) => {
    const response = await kanbanService.deleteBoard(id);
    if (response.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de supprimer le kanban",
        variant: "destructive",
      });
      return;
    }

    const updatedKanbanList = kanbanList.filter((kanban) => kanban.id !== id);
    setKanbanList(updatedKanbanList);
  };

  const onCreate = async (name: string) => {
    const response = await kanbanService.createBoard(name);
    if (response.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de créer le kanban",
        variant: "destructive",
      });
      return;
    }

    setKanbanList([response.data, ...kanbanList]);

    const columnResponse = await columnService.createColumn(
      response.data.id,
      "À faire"
    );
    if (columnResponse.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de créer la colonne",
        variant: "destructive",
      });
      return;
    }
    const columnDto: ColumnDto = {
      column: columnResponse.data,
      cards: [],
    };
    addColumn(columnDto);
  };

  return { onUpdate, onDelete, onCreate };
}
