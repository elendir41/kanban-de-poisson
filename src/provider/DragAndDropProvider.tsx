import { DragAndDropContext } from "@/context/DragAndDropContext";
import { extractId } from "@/lib/utils";
import { TaksData } from "@/models/DragData.type";
import CardDto from "@/models/dto/cardDto.type";
import ColumnDto from "@/models/dto/columnDto.type";
import useKanbanStore from "@/stores/kanban-store";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

type DragAndDropProviderProps = {
  children: React.ReactNode;
};

export default function DragAndDropProvider({
  children,
}: DragAndDropProviderProps) {
  const columnsDefault = useKanbanStore((state) => state.columns);

  const [columns, setColumns] = useState(columnsDefault);
  function rollBackColumns() {
    setColumns(columnsDefault);
  }

  function moveTaskColumn(
    activeId: string,
    activeData: TaksData,
    overId: string,
    overColumnId: string
  ) {
    const activeColumnId = activeData.task.card.columnId;
    setColumns((cols) => {
      const activeColumn = cols.find((col) => col.column.id === activeColumnId);
      const overColumn = cols.find((col) => col.column.id === overColumnId);
      if (!activeColumn || !overColumn) {
        return cols;
      }
      const newActiveColumn: ColumnDto = {
        ...activeColumn,
        cards: activeColumn.cards.filter((task) => task.card.id !== activeId),
      };
      const updatedTask: CardDto = {
        ...activeData.task,
        card: { ...activeData.task.card, columnId: overColumnId },
      };
      const isEmpty = overColumn.cards.length === 0;
      const overIndex = overColumn.cards.findIndex(
        (task) => task.card.id === overId
      );
      const newOverColumn: ColumnDto = {
        ...overColumn,
        cards: isEmpty
          ? [updatedTask]
          : [
              ...overColumn.cards.slice(0, overIndex),
              updatedTask,
              ...overColumn.cards.slice(overIndex, overColumn.cards.length),
            ],
      };
      return cols.map((col) => {
        if (col.column.id === activeColumnId) {
          return newActiveColumn;
        } else if (col.column.id === overColumnId) {
          return newOverColumn;
        }
        return col;
      });
    });
  }

  function moveColumn(activeId: string, overId: string) {
    const activeColumnId = extractId(activeId);
    const overColumnId = extractId(overId);
    setColumns((cols) => {
      const oldIndex = cols.findIndex(
        (col) => col.column.id === activeColumnId
      );
      const newIndex = cols.findIndex((col) => col.column.id === overColumnId);
      return arrayMove(cols, oldIndex, newIndex);
    });
    // call api update column and rollback if error
  }

  function updateRankTask(
    activeId: string,
    overId: string,
    activeData: TaksData,
    overData: TaksData
  ) {
    const activeTaskId = extractId(activeId);
    const overTaskId = extractId(overId);
    const activeColumnId = activeData.task.card.columnId;
    const overColumnId = overData.task.card.columnId;
    if (!activeColumnId || !overColumnId) {
      return;
    }

    if (activeColumnId === overColumnId) {
      // call api update task
      setColumns((cols) => {
        const activeColumn = cols.find(
          (col) => col.column.id === activeColumnId
        );
        if (!activeColumn) {
          return cols;
        }
        const activeIndex = activeColumn.cards.findIndex(
          (task) => task.card.id === activeTaskId
        );
        const overIndex = activeColumn.cards.findIndex(
          (task) => task.card.id === overTaskId
        );
        return cols.map((col) => {
          if (col.column.id === activeColumnId) {
            return {
              ...col,
              cards: arrayMove(col.cards, activeIndex, overIndex),
            };
          }
          return col;
        });
      });
      return;
    }
  }
  return (
    <DragAndDropContext.Provider
      value={{
        columns,
        rollBackColumns,
        moveTaskColumn,
        moveColumn,
        updateRankTask,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
}
