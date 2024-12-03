import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import TaskCardModal from "../TaskCardModal";
import TCard from "@/models/card.type";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import useCrudCard from "@/hooks/useCrudCard";
import { CardCreateFormType } from "@/models/schema/card-create-form.type";
import useKanbanStore from "@/stores/kanban-store";

type TaskCardProps = {
  card: TCard;
  setNodeRef?: (node: HTMLElement | null) => void;
  style?: React.CSSProperties;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  className?: string;
};

export default function CardContainer({
  card,
  setNodeRef,
  style,
  attributes,
  listeners,
  className,
}: TaskCardProps) {
  const [title, setTitle] = useState(card.title);
  const [body, setBody] = useState(card.body);
  const currentBoardId = useKanbanStore((state) => state.currentBoardId);
  const { onUpdate, onDelete } = useCrudCard();

  const onUpdateCard = useCallback(
    async (updatedCard: TCard) => {
      const response = await onUpdate(updatedCard);
      if (response) {
        setTitle(response.title);
        setBody(response.body);
      }
    },
    [card, title, body, onUpdate]
  );

  const onDeleteCard = useCallback(async () => {
    const cardForm: CardCreateFormType = {
      title,
      body,
      columnId: card.columnId,
      rank: card.rank,
      boardId: currentBoardId,
    };
    await onDelete(card.id, cardForm);
  }, [card, onDelete]);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={className}
    >
      <CardHeader className="flex-row w-full justify-between relative">
        <CardTitle>{title}</CardTitle>
        <TaskCardModal
          card={card}
          onDelete={onDeleteCard}
          onUpdate={onUpdateCard}
        />
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
