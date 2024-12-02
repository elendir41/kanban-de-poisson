import Card from "@/models/card.type";
import CardDto from "@/models/dto/cardDto.type";
import ColumnDto from "@/models/dto/columnDto.type";
import { create } from "zustand";

type KanbanStore = {
  currentBoardId: string;
  columns: ColumnDto[];

  setCurrentBoardId: (id: string) => void;

  addColumn: (column: ColumnDto) => void;
  updateColumn: (column: ColumnDto) => void;
  deleteColumn: (id: string) => void;

  addTask: (columnId: string, task: CardDto) => void;
  updateTask: (columnId: string, task: CardDto) => void;
  deleteTask: (columnId: string, taskId: string) => void;

  setColumns: (columns: ColumnDto[]) => void;
};

const useKanbanStore = create<KanbanStore>((set) => ({
  currentBoardId: "",
  columns: [],

  setCurrentBoardId: (id: string) => set({ currentBoardId: id }),

  addColumn: (column: ColumnDto) =>
    set((state) => ({ columns: [...state.columns, column] })),

  updateColumn: (column: ColumnDto) =>
    set((state) => ({
      columns: state.columns.map((c) =>
        c.column.id === column.column.id ? column : c
      ),
    })),

  deleteColumn: (id: string) =>
    set((state) => ({
      columns: state.columns.filter((c) => c.column.id !== id),
    })),

  addTask: (columnId: string, task: CardDto) =>
    set((state) => ({
      columns: state.columns.map((c) =>
        c.column.id === columnId ? { ...c, tasks: [...c.cards, task] } : c
      ),
    })),

  updateTask: (columnId: string, task: CardDto) =>
    set((state) => ({
      columns: state.columns.map((c) =>
        c.column.id === columnId
          ? {
              ...c,
              tasks: c.cards.map((t) =>
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
              tasks: c.cards.filter((t) => t.card.id !== taskId),
            }
          : c
      ),
    })),

  setColumns: (columns: ColumnDto[]) => set({ columns }),
}));

export default useKanbanStore;
