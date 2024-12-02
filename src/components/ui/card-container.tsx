import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import TaskCardModal from "../TaskCardModal";
import TCard from "@/models/card.type";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import useCrudCard from "@/hooks/useCrudCard";
import { toast } from "@/hooks/use-toast";

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
  className
}: TaskCardProps) {
  const [title, setTitle] = useState(card.title);
  const [body, setBody] = useState(card.body);

  const { onUpdate, onDelete } = useCrudCard();

  const onUpdateCard = useCallback(async () => {
    const response = await onUpdate(card);
    if (response.data) {
      toast({ title: "La carte a été mise à jour" });
      setTitle(response.data.card.title);
      setBody(response.data.card.body);
    } else {
      toast({ title: response.error.message, variant: "destructive" });
    }
  }, [card, title, body, onUpdate]);

  const onDeleteCard = useCallback(async () => {
    const response = await onDelete(card.id);
    if (response.data) {
      toast({ title: "La carte a été supprimée" });
    } else {
      toast({ title: response.error.message, variant: "destructive" });
    }
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
