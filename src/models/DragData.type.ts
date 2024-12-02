import CardDto from "./dto/cardDto.type";
import ColumnDto from "./dto/columnDto.type";

export type TaksData = {
  task: CardDto;
  type: "task";
};

export type ColumnData = {
  column: ColumnDto;
  type: "column";
};

export type DragData = TaksData | ColumnData | undefined;


