import Column from "@/components/Column";
import SortableTaskCard from "@/components/SortableTaskCard";
import { useDragAndDropContext } from "@/context/DragAndDropContext";
import { useToast } from "@/hooks/use-toast";
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

export default function Board() {
  const { toast } = useToast();

  const [draggedColumn, setDraggedColumn] = useState<ColumnDto | null>(null);
  const [draggedTask, setDraggedTask] = useState<CardDto | null>(null);
  const [canDrag, setCanDrag] = useState(true);

  const {
    columns,
    rollBackColumns,
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

  function rollback(type: "column" | "task") {
    rollBackColumns();
    setDraggedColumn(null);
    setDraggedTask(null);
    setCanDrag(false);
    if (type === "column") {
      toast({
        title: "Impossible de mettre à jour la colonne",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Impossible de mettre à jour la tâche",
        variant: "destructive",
      });
    }
  }

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
      // call api move to new column
      // new Promise(() => {
      //   setTimeout(() => {
      //     rollback();
      //   }, 1000);
      // });
    } catch (error) {
      return;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    if (!canDrag) {
      return;
    }
    try {
      const { activeData, overData, activeId, overId } = validateDragEnd(event);
      if (activeData?.type === "column" && overData?.type === "column") {
        moveColumn(activeId, overId);
      }

      if (overData?.type === "task" && activeData?.type === "task") {
        updateRankTask(activeId, overId, activeData, overData);
      }
    } catch (error) {
      return;
    } finally {
      setDraggedTask(null);
      setDraggedColumn(null);
    }
  }

  return (
    <div className="m-3 flex h-[50%] w-full gap-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={columnsIds}>
          {columns.map((column) => (
            <Column key={column.column.id} column={column} />
          ))}
        </SortableContext>
        <DragOverlay>
          {draggedColumn && canDrag ? <Column column={draggedColumn} /> : null}
          {draggedTask && canDrag ? (
            <SortableTaskCard task={draggedTask} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
