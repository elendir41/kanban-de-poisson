import { TaksData } from "@/models/DragData.type";
import ColumnDto from "@/models/dto/columnDto.type";
import { createContext, useContext } from "react";

type DragAndDropContextType = {
  columns: ColumnDto[];


  moveTaskColumn: (
    activeId: string,
    activeData: TaksData,
    overId: string,
    overColumnId: string
  ) => void;

  moveColumn: (activeId: string, overId: string) => void;
  updateRankTask: (
    activeId: string,
    overId: string,
    activeData: TaksData,
    overData: TaksData
  ) => void;
};

export const DragAndDropContext = createContext<
  DragAndDropContextType | undefined
>(undefined);

export const useDragAndDropContext = () => {
  const context = useContext(DragAndDropContext);
  if (context === undefined) {
    throw new Error(
      "useDragAndDropContext must be used within a DragAndDropContext.Provider"
    );
  }
  return context;
};
