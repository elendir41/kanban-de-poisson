import Column from "@/components/Column";
import SortableTaskCard from "@/components/SortableTaskCard";
import { useDragAndDropContext } from "@/context/DragAndDropContext";
import { validateDragEnd, validateDragOver } from "@/lib/utils";
import CardDto from "@/models/dto/cardDto.type";
import ColumnDto from "@/models/dto/columnDto.type";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import AddColumnContainer from "./AddColumnContainer";
import useKanbanStore from "@/stores/kanban-store";

export default function Board() {
  const [draggedColumn, setDraggedColumn] = useState<ColumnDto | null>(null);
  const [draggedTask, setDraggedTask] = useState<CardDto | null>(null);
  const [canDrag, setCanDrag] = useState(true);

  const boardName = useKanbanStore(
    (state) =>
      state.kanbanList.find((kanban) => kanban.id === state.currentBoardId)
        ?.name
  );

  const {
    columns,
    moveTaskColumn,
    moveColumn,
    updateRankTask,
  } = useDragAndDropContext();

  const columnsIds = useMemo(
    () => columns.map((column) => `column-${column.column.id}`),
    [columns]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setCanDrag(true);
    const { active } = event;
    if (active.data.current?.type === "column") {
      setDraggedColumn(active.data.current.column);
    } else if (active.data.current?.type === "task") {
      setDraggedTask(active.data.current.task);
    }
  }

  function handleDragOver(event: DragEndEvent) {
    if (!canDrag) {
      return;
    }

    try {
      const validate = validateDragOver(event);
      if (!validate) {
        return;
      }
      const { overColumnId, activeCurrent, overId, activeId } = validate;
      moveTaskColumn(activeId, activeCurrent, overId, overColumnId);
      return;
    } catch (error) {}

    if (event.active.data.current?.type === "column") {
      try {
        const { activeData, overData, activeId, overId } =
          validateDragEnd(event);
        if (activeData?.type === "column" && overData?.type === "column") {
          moveColumn(activeId, overId);
        }
        return;
      } catch (error) {}
    }

    if (event.active.data.current?.type === "task") {
      try {
        const { activeData, overData, activeId, overId } =
          validateDragEnd(event);
        if (overData?.type === "task" && activeData?.type === "task") {
          updateRankTask(activeId, overId, activeData, overData);
          return;
        }
      } catch (error) {}
    }
  }

  function handleDragEnd() {
    if (!canDrag) {
      return;
    }
    setDraggedTask(null);
    setDraggedColumn(null);
  }

  return (
    <div className="h-full">
      <div className="w-full p-2 flex justify-center">
        <h1 className="text-xl font-bold">{boardName}</h1>
      </div>
      <div className="p-3 flex h-[80%] overflow-auto gap-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={columnsIds}>
            {columns
              .sort((a, b) => a.column.rank - b.column.rank)
              .map((column) => (
                <Column key={column.column.id} columnId={column.column.id} />
              ))}
          </SortableContext>
          <AddColumnContainer />
          <DragOverlay>
            {draggedColumn && canDrag ? (
              <Column columnId={draggedColumn.column.id} />
            ) : null}
            {draggedTask && canDrag ? (
              <SortableTaskCard task={draggedTask} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
