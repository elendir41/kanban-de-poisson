import { useParams } from "react-router-dom";
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import Column from "@/components/Column";
import { useState } from "react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ColumnProps } from "@/components/Column";
import { useToast } from "@/hooks/use-toast";
import useCrudCard from "@/hooks/useCrudCard";

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

const cardsList: ColumnProps[] = [
  {
    id: "Column1",
    title: "Column1",
    cards: [
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
    ],
  },
  {
    id: "Column2",
    title: "Column2",
    cards: [
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
    ]
  },
];

export default function Kanban() {
  // let params = useParams();

  const { toast } = useToast();
  const { onMoveTo, onUpdate } = useCrudCard();

  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [originColumnId, setOriginColumnId] = useState<string | null>(null);

  // async function onDragEnd(result: DragEndEvent) {
  //   const { active, over } = result;
  //   console.log("darg end")
  //   console.log(over)
  //   if (!over) {
  //     return;
  //   }
  //   const draggedCardId = active.id.toString();
  //   // move to new column
  //   if (over.data.current?.type == "column") {
  //     const newColumnId = over.id.toString();
  //     const draggedCard = cards.find((card) => card.id === draggedCardId);
  //     if (draggedCard) {
  //       const response = await onMoveTo(draggedCardId, newColumnId, draggedCard);
  //       if (!response.success) {
  //         toast({ title: response.error, variant: "destructive" });
  //       }
  //     }
  //   }
  //   // move to new rank
  //   if (over.data.current?.type == "card") {
  //     const newRank = parseInt(cards.find((card) => card.id === over.id)?.rank.toString() ?? "0");
  //     const draggedCard = cards.find((card) => card.id === draggedCardId);
  //     const previousRank = draggedCard?.rank ?? 0;
  //     if (draggedCard) {
  //       const updatedCard = {
  //         ...draggedCard,
  //         rank: newRank,
  //       };
  //       const newCards = cards.map(card => {
  //         if (card.columnId === updatedCard.columnId) {
  //           if (card.id === draggedCardId) {
  //             return { ...card, rank: newRank };
  //           }
  //           if (newRank < previousRank && card.rank >= newRank && card.rank < previousRank) {
  //             return { ...card, rank: card.rank + 1 };
  //           }
  //           if (newRank > previousRank && card.rank <= newRank && card.rank > previousRank) {
  //             return { ...card, rank: card.rank - 1 };
  //           }
  //         }
  //         return card;
  //       });
  //       setCards(newCards);
  //       // const response = await onUpdate(updatedCard);
  //       // if (!response.success) {
  //       //   toast({ title: response.error, variant: "destructive" });
  //       // }
  //     }
  //   }
  // }

  const [columns, setColumns] = useState<ColumnProps[]>(cardsList);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id;
      return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
    });
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards;
      const overItems = overColumn.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i.id !== activeId);
          return c;
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length)
          ];
          return c;
        } else {
          return c;
        }
      });
    });
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  return (
    <div className="h-full mb-9">
      <h1 className="text-2xl">Kanban</h1>
      <section className="flex max-h-full">
        <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd} sensors={sensors} onDragOver={onDragOver}>
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={column.cards}
            ></Column>
          ))}
        </DndContext>
      </section>
    </div>
  );
}
