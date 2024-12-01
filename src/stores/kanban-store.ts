import { create } from "zustand";

type KanbanStore = {
  currentBoardId: string;
};

const useKanbanStore = create<KanbanStore>((set) => ({
  currentBoardId: "",

  setCurrentBoardIdId: (id: string) => set({ currentBoardId: id }),
}));

export default useKanbanStore;
