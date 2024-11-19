import Card from "@/models/card.type";
import { CardCreateForm } from "@/models/schema/card-create-form.type";
import { useServiceContext } from "@/context/ServiceContext";
import useKanbanStore from "@/stores/kanban-store";

export default function useCrudCard() {
  const { cardService } = useServiceContext();
  const currentBoardId = useKanbanStore((state) => state.currentBoardId);

  const onUpdate = async (card: Card) => {
    const updatedCard: CardCreateForm = {
      title: card.title,
      body: card.body,
      columnId: card.columnId,
      rank: card.rank,
      boardId: currentBoardId,
    };

    return await cardService.updateCard(card.id, updatedCard);
  };

  const onDelete = async (id: string) => {
    return await cardService.deleteCard(id);
  };

  const onMoveTo = async (cardId: string, newColumnId: string, card: Card) => {
    const updatedCard: CardCreateForm = {
      title: card.title,
      body: card.body,
      columnId: newColumnId,
      rank: card.rank,
      boardId: currentBoardId,
    };

    return await cardService.moveTo(cardId, newColumnId, updatedCard);
  };

  return { onUpdate, onDelete, onMoveTo };
}
