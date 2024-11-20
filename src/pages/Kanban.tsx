import { useParams } from "react-router-dom";
import { closestCorners, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Column from "@/components/Column";
import useCrudCard from "@/hooks/useCrudCard";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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

const cardsList: Card[] = [
  {
    id: "7",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 6",
    body: "Task 6 description",
    columnId: "1",
    rank: 0,
  },
  {
    id: "2",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 2",
    body: "Task 2 description",
    columnId: "1",
    rank: 1,
  },
  {
    id: "3",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 3",
    body: "Task 3 description",
    columnId: "1",
    rank: 2,
  },
  {
    id: "4",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 4",
    body: "Task 4 description",
    columnId: "0",
    rank: 0,
  },
  {
    id: "5",
    version: 1,
    createdAt: "2021-10-01T00:00:00",
    updatedAt: "2021-10-01T00:00:00",
    title: "Task 5",
    body: "Task 4 description",
    columnId: "0",
    rank: 1,
  },
];

export default function Kanban() {
  let params = useParams();

  const { toast } = useToast();
  const { onMoveTo, onUpdate } = useCrudCard();

  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>(cardsList);

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: { distance: 5 },
  }),)

  async function onDragStart(event: any) {
    setDraggedCardId(event.active.id);
  }

  async function onDragEnd(result: DragEndEvent) {
    const { active, over } = result;
    console.log("darg end")
    console.log(active)
    console.log(over)
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
        if (!response.success) {
          toast({ title: response.error, variant: "destructive" });
        }
      }
    }
    // move to new rank
    if (over.data.current?.type == "card") {
      const newRank = parseInt(cards.find((card) => card.id === over.id)?.rank.toString() ?? "0");
      const draggedCard = cards.find((card) => card.id === draggedCardId);
      const previousRank = draggedCard?.rank ?? 0;
      if (draggedCard) {
        const updatedCard = {
          ...draggedCard,
          rank: newRank,
        };
        const newCards = cards.map(card => {
          if (card.columnId === updatedCard.columnId) {
            if (card.id === draggedCardId) {
              return { ...card, rank: newRank };
            }
            if (newRank < previousRank && card.rank >= newRank && card.rank < previousRank) {
              return { ...card, rank: card.rank + 1 };
            }
            if (newRank > previousRank && card.rank <= newRank && card.rank > previousRank) {
              return { ...card, rank: card.rank - 1 };
            }
          }
          return card;
        });
        console.log(newCards.map(card => card.rank));
        setCards(newCards);
        // const response = await onUpdate(updatedCard);
        // if (!response.success) {
        //   toast({ title: response.error, variant: "destructive" });
        // }
      }
    }
  }

  return (
    <div className="h-full mb-9">
      <h1 className="text-2xl">Kanban</h1>
      <section className="flex max-h-full">
        <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd} sensors={sensors} onDragStart={onDragStart}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Column
              id={i.toString()}
              key={i}
              title={`Column ${i + 1}`}
              cards={cards.filter((card) => card.columnId === i.toString()).sort((a, b) => a.rank - b.rank)}
            ></Column>
          ))}
        </DndContext>
      </section>
    </div>
  );
}
