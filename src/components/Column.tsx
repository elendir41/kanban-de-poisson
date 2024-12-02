import {
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import ColumnDto from "@/models/dto/columnDto.type";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import ColumnContainer from "./ui/column-container";
import SortableTaskCard from "./SortableTaskCard";

export type ColumnProps = {
  column: ColumnDto;
};

export default function Column({ column }: { column: ColumnDto }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: `column-${column.column.id}`,
      data: {
        type: "column",
        column: column,
      },
    });

  const tasksIds = useMemo(
    () => column.cards.map((task) => `task-${task.card.id}`),
    [column, column.cards]
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className="min-h-full flex bg-white ">
      <ColumnContainer
        title={column.column.name}
        attributes={attributes}
        listeners={listeners}
      >
        <SortableContext items={tasksIds}>
          {column.cards.map((task) => (
            <SortableTaskCard key={task.card.id} task={task}></SortableTaskCard>
          ))}
        </SortableContext>
      </ColumnContainer>
    </div>
  );
}
