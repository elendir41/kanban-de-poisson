import Board from "@/models/board.type";
import Column from "@/models/column.type";
import CardDto from "@/models/dto/cardDto.type";
import ColumnDto from "@/models/dto/columnDto.type";
import { create } from "zustand";

type KanbanStore = {
  currentBoardId: string;
  columns: ColumnDto[];

  kanbanList: Board[];
  setKanbanList: (kanban: Board[]) => void;

  setCurrentBoardId: (id: string) => void;

  addColumn: (column: Column) => void;
  updateColumn: (column: Column) => void;
  deleteColumn: (id: string) => void;

  addTask: (columnId: string, task: CardDto) => void;
  updateTask: (columnId: string, task: CardDto) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  moveTo: (cardId: string, newColumnId: string, card: CardDto) => void;

  setColumns: (columns: ColumnDto[]) => void;
};

const useKanbanStore = create<KanbanStore>((set) => ({
  currentBoardId: "",
  columns: [],
  kanbanList: [],

  setKanbanList: (kanbanList: Board[]) => set({ kanbanList }),

  setCurrentBoardId: (id: string) => set({ currentBoardId: id }),

  addColumn: (column: Column) =>
    set((state) => ({
      columns: [...state.columns, { column, cards: [] }],
    })),

  updateColumn: (column: Column) =>
    set((state) => ({
      columns: state.columns.map((c) =>
        c.column.id === column.id ? { ...c, column } : c
      ),
    })),

  deleteColumn: (id: string) =>
    set((state) => ({
      columns: [...state.columns.filter((c) => c.column.id !== id)],
    })),

  addTask: (columnId: string, task: CardDto) =>
    set((state) => ({
      columns: state.columns.map((c) =>
        c.column.id === columnId ? { ...c, cards: [...c.cards, task] } : c
      ),
    })),

  updateTask: (columnId: string, task: CardDto) =>
    set((state) => ({
      columns: state.columns.map((c) =>
        c.column.id === columnId
          ? {
              ...c,
              cards: c.cards.map((t) =>
                t.card.id === task.card.id ? task : t
              ),
            }
          : c
      ),
    })),

  deleteTask: (columnId: string, taskId: string) =>
    set((state) => ({
      columns: state.columns.map((c) =>
        c.column.id === columnId
          ? {
              ...c,
              cards: c.cards.filter((t) => t.card.id !== taskId),
            }
          : c
      ),
    })),

  moveTo: (cardId: string, newColumnId: string, card: CardDto) =>
    set((state) => {
      const newColumns = state.columns.map((c) => {
        if (c.column.id === card.card.columnId) {
          return {
            ...c,
            cards: c.cards.filter((t) => t.card.id !== cardId),
          };
        }
        if (c.column.id === newColumnId) {
          return {
            ...c,
            cards: [...c.cards, card],
          };
        }
        return c;
      });

      return { columns: newColumns };
    }),

  setColumns: (columns: ColumnDto[]) => set({ columns }),
}));

export default useKanbanStore;
