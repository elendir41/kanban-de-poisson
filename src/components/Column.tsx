import Card from "@/models/card.type";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

type ColumnProps = {
  id: string;
  title: string;
  cards: Card[];
};

export default function Column({ id, title, cards }: ColumnProps) {

  const { setNodeRef, } = useSortable({
    id,
    data: {
      type: "column",
    }
  });

  return (
    <div ref={setNodeRef} className="bg-blue-600 p-2 m-2 rounded-lg flex-1 border border-black gap-2 flex flex-col">
      <h2 className="text-xl text-white font-bold">{title}</h2>
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <TaskCard key={card.id} card={card} />
          ))}
        </SortableContext>
    </div>
  );
}
