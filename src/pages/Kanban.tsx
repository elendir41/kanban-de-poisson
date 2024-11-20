import { useParams } from "react-router-dom";
import { closestCorners, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Column from "@/components/column";
import useCrudCard from "@/hooks/useCrudCard";
import { useToast } from "@/hooks/use-toast";

type Card = {
  id: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
  columnId: string;
  rank: number;
};

const cards: Card[] = [
  {
    id: "1",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 1",
    body: "Task 1 description",
    columnId: "0",
    rank: 0,
  },
  {
    id: "2",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 2",
    body: "Task 2 description",
    columnId: "0",
    rank: 1,
  },
  {
    id: "3",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 3",
    body: "Task 3 description",
    columnId: "0",
    rank: 2,
  },
  {
    id: "4",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 4",
    body: "Task 4 description",
    columnId: "1",
    rank: 0,
  }
];

export default function Kanban() {
  let params = useParams();

  const { toast } = useToast();
  const { onMoveTo, onUpdate } = useCrudCard();

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: { distance: 5 },
    }),)

  async function onDragEnd(result: DragEndEvent) {
    console.log(result);
    const { active, over } = result;
    if (!over) {
      return;
    }
    const draggedCardId = active.id.toString();
    // move to new column
    if (over.data.current?.type == "column") {
      const newColumnId = over.id.toString();
      const draggedCard = cards.find((card) => card.id === draggedCardId);
      if (draggedCard) {
        const response = await onMoveTo(draggedCardId, newColumnId, draggedCard);
        if (!response.data) {
          toast({ title: response.error, variant: "destructive" });
        }
      }
    }
    // move to new rank
    if (over.data.current?.type == "card") {
      const newRank = over.id.toString();
      const draggedCard = cards.find((card) => card.id === draggedCardId);
      if (draggedCard) {
        const updatedCard = {
          ...draggedCard,
          rank: parseInt(newRank),
        };
        const response = await onUpdate(updatedCard);
        if (!response.data) {
          toast({ title: response.error, variant: "destructive" });
        }
      }
    }
  }

  return (
    <div className="h-full mb-9">
      <h1 className="text-2xl">Kanban</h1>
      <section className="flex max-h-full">
        <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd} sensors={sensors}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Column
              id={i.toString()}
              key={i}
              title={`Column ${i + 1}`}
              cards={cards.filter((card) => card.columnId === i.toString())}
            ></Column>
          ))}
        </DndContext>
      </section>
    </div>
  );
}
