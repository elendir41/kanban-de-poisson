import { DragAndDropContext } from "@/context/DragAndDropContext";
import useCrudCard from "@/hooks/useCrudCard";
import useCrudColumn from "@/hooks/useCrudColumn";
import { extractId } from "@/lib/utils";
import { TaksData } from "@/models/DragData.type";
import CardDto from "@/models/dto/cardDto.type";
import ColumnDto from "@/models/dto/columnDto.type";
import useKanbanStore from "@/stores/kanban-store";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

type DragAndDropProviderProps = {
  children: React.ReactNode;
};

export default function DragAndDropProvider({
  children,
}: DragAndDropProviderProps) {
  const columnsDefault = useKanbanStore((state) => state.columns);
  const setDefaultColumns = useKanbanStore((state) => state.setColumns);

  const { onUpdate: onUpdateTask, onMoveTo: onMoveToTask } = useCrudCard();
  const { onUpdate: onColumnUpdate } = useCrudColumn();

  const [columns, setColumns] = useState(columnsDefault);

  useEffect(() => {
    refreshColumns();
  }, [columnsDefault]);

  function refreshColumns() {
    setColumns(columnsDefault);
  }

  function saveState(newColumns: ColumnDto[]) {
    setDefaultColumns(newColumns);
  }

  async function moveTaskColumn(
    activeId: string,
    activeData: TaksData,
    overId: string,
    overColumnId: string
  ) {
    const activeColumnId = activeData.task.card.columnId;
    const activeColumn = columns.find(
      (col) => col.column.id === activeColumnId
    );
    const overColumn = columns.find((col) => col.column.id === overColumnId);
    if (!activeColumn || !overColumn) {
      return;
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
    const newColunms = columns.map((col) => {
      if (col.column.id === activeColumnId) {
        return newActiveColumn;
      } else if (col.column.id === overColumnId) {
        return newOverColumn;
      }
      return col;
    });
    setColumns(newColunms);
    const response = await onMoveToTask(
      activeId,
      overColumnId,
      activeData.task.card
    );
    if (!response) {
      refreshColumns();
    } else {
      saveState(newColunms);
    }
  }

  async function moveColumn(activeId: string, overId: string) {
    const activeColumnId = extractId(activeId);
    const overColumnId = extractId(overId);
    const oldIndex = columns.findIndex(
      (col) => col.column.id === activeColumnId
    );
    const newIndex = columns.findIndex((col) => col.column.id === overColumnId);
    const movingCol = columns[oldIndex];
    const movedCol = columns[newIndex];
    setColumns((cols) => {
      return arrayMove(cols, oldIndex, newIndex);
    });
    const oldRank = movingCol.column.rank;
    movingCol.column.rank = movedCol.column.rank;
    movedCol.column.rank = oldRank;
    const response1 = await onColumnUpdate(movingCol.column);
    const response2 = await onColumnUpdate(movedCol.column);
    if (!response1 || !response2) {
      refreshColumns();
    } else {
      const newColumns = columns.map((col) => {
        if (col.column.id === response1.id) {
          return { column: response1, cards: col.cards };
        }
        if (col.column.id === response2.id) {
          return { column: response2, cards: col.cards };
        }
        return col;
      });
      saveState(newColumns);
    }
  }

  async function updateRankTask(
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
      const activeColumn = columns.find(
        (col) => col.column.id === activeColumnId
      );
      if (!activeColumn) {
        return;
      }
      const activeIndex = activeColumn.cards.findIndex(
        (task) => task.card.id === activeTaskId
      );
      const overIndex = activeColumn.cards.findIndex(
        (task) => task.card.id === overTaskId
      );
      const newColumns = columns.map((col) => {
        if (col.column.id === activeColumnId) {
          return {
            ...col,
            cards: arrayMove(col.cards, activeIndex, overIndex),
          };
        }
        return col;
      });
      setColumns(newColumns);
      const card = activeData.task.card;
      card.rank = overIndex;
      const response = await onUpdateTask(card);
      if (!response) {
        refreshColumns();
      } else {
        saveState(newColumns);
      }
    }
  }
  return (
    <DragAndDropContext.Provider
      value={{
        columns,
        moveTaskColumn,
        moveColumn,
        updateRankTask,
      }}
    >
      {children}
    </DragAndDropContext.Provider>
  );
}
