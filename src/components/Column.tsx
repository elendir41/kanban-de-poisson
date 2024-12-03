import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import ColumnContainer from "./ui/column-container";
import SortableTaskCard from "./SortableTaskCard";
import AddCardButton from "./AddCardModal";
import useCrudColumn from "@/hooks/useCrudColumn";
import { useDragAndDropContext } from "@/context/DragAndDropContext";

export type ColumnProps = {
  columnId: string;
  isOnDrag?: boolean;
};

export default function Column({ columnId, isOnDrag }: ColumnProps) {
  const { onDelete } = useCrudColumn();
  const { columns } = useDragAndDropContext();

  const column = useMemo(
    () => columns.find((col) => col.column.id === columnId),
    [columns, columnId]
  );

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: `column-${column?.column.id}`,
      data: {
        type: "column",
        column: column,
      },
    });

  const tasksIds = useMemo(
    () => column?.cards.map((task) => `task-${task.card.id}`) ?? [],
    [column, column?.cards.length]
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  async function handleDelete() {
    if (!column) return;
    await onDelete(column.column.id);
  }

  if (!column) return null;

  return (
    <div ref={setNodeRef} style={style} className={`min-h-full flex bg-white ${isOnDrag ? 'opacity-50' : 'opacity-100'}`}>
      <ColumnContainer
        title={column.column.name}
        columnId={column.column.id}
        attributes={attributes}
        listeners={listeners}
        onDelete={handleDelete}
      >
        <SortableContext items={tasksIds}>
          {column.cards.map((task) => (
            <SortableTaskCard key={task.card.id} task={task}></SortableTaskCard>
          ))}
        </SortableContext>
        <AddCardButton columnId={column.column.id} rank={column.cards.length} />
      </ColumnContainer>
    </div>
  );
}
