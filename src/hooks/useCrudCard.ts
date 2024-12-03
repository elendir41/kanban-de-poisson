import Card from "@/models/card.type";
import { CardCreateFormType } from "@/models/schema/card-create-form.type";
import { useServiceContext } from "@/context/ServiceContext";
import useKanbanStore from "@/stores/kanban-store";
import CardDto from "@/models/dto/cardDto.type";
import { useToast } from "./use-toast";

export default function useCrudCard() {
  const { cardService } = useServiceContext();
  const currentBoardId = useKanbanStore((state) => state.currentBoardId);
  const addTask = useKanbanStore((state) => state.addTask);
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const { toast } = useToast();

  const onUpdate = async (card: Card) => {
    const updatedCard: CardCreateFormType = {
      title: card.title,
      body: card.body,
      columnId: card.columnId,
      rank: card.rank,
      boardId: currentBoardId,
    };

    const response = await cardService.updateCard(card.id, updatedCard);
    if (response.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de mettre à jour la carte",
        variant: "destructive",
      });
    }
    else {
      return response.data;
    }
  };

  const onDelete = async (id: string, card: CardCreateFormType) => {
    const response = await cardService.deleteCard(id, card);
    if (response.error) {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de supprimer la carte",
        variant: "destructive",
      });
    }
    else {
      deleteTask(card.columnId, id);
    }
  };

  const onMoveTo = async (cardId: string, newColumnId: string, card: Card) => {
    const cardForm: CardCreateFormType = {
      title: card.title,
      body: card.body,
      columnId: card.columnId,
      rank: card.rank,
      boardId: currentBoardId,
    };

    const response = await cardService.moveTo(cardId, newColumnId, cardForm);
    if (response.data) {
      const cardDto: CardDto = {
        card: response.data,
        boardId: currentBoardId,
      };
      return cardDto;
    } else {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de déplacer la carte",
        variant: "destructive",
      });
    }
  };

  const onCreate = async (card: CardCreateFormType) => {
    const response = await cardService.createCard(card);
    if (response.data) {
      const cardDto: CardDto = {
        card: response.data,
        boardId: currentBoardId,
      };
      addTask(card.columnId, cardDto);
    } else {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de créer la carte",
        variant: "destructive",
      });
    }
  };

  return { onUpdate, onDelete, onMoveTo, onCreate };
}
