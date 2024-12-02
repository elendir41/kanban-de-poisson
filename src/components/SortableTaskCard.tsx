import CardDto from "@/models/dto/cardDto.type";
import { useSortable } from "@dnd-kit/sortable";
import CardContainer from "./ui/card-container";
import { CSS } from "@dnd-kit/utilities";

export default function SortableTaskCard({ task }: { task: CardDto }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: `task-${task.card.id}`,
    data: {
      type: "task",
      task: task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <CardContainer
      card={task.card}
      setNodeRef={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      className={isDragging ? "opacity-50" : ""}
    />
  );
}
