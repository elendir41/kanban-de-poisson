import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TCard from "@/models/card.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCardModal from "./TaskCardModal";
import { useCallback, useState } from "react";
import useCrudCard from "@/hooks/useCrudCard";
import { useToast } from "@/hooks/use-toast";

type TaskCardProps = {
  card: TCard;
};

export default function TaskCard({ card }: TaskCardProps) {
  const { toast } = useToast();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `${card.id}`,
    data: { type: "card" },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  const [title, setTitle] = useState(card.title);
  const [body, setBody] = useState(card.body);

  const { onUpdate, onDelete } = useCrudCard();

  const onUpdateCard = useCallback(async () => {
    const response = await onUpdate(card);
    if (response.success) {
      toast({ title: "La carte a été mise à jour" });
      setTitle(response.data.card.title);
      setBody(response.data.card.body);
    } else {
      toast({ title: response.error, variant: "destructive" });
    }
  }, [card, title, body, onUpdate]);

  const onDeleteCard = useCallback(async () => {
    const response = await onDelete(card.id);
    if (response.success) {
      toast({ title: "La carte a été supprimée" });
    } else {
      toast({ title: response.error, variant: "destructive" });
    }
  }, [card, onDelete]);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className=""
    >
      <CardHeader className="flex-row w-full justify-between">
        <CardTitle>{title}</CardTitle>
        <TaskCardModal card={card} onDelete={onDeleteCard} onUpdate={onUpdateCard}/>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
