import CardDto from "./cardDto.type";
import Column from "../column.type";

type ColumnDto = {
  column: Column;
  cards: CardDto[];
};

export default ColumnDto;
