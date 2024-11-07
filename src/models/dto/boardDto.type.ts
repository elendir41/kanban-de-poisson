import Board from "../board.type";
import ColumnDto from "./columnDto.type";

type BoardDto = {
  board: Board;
  columns: ColumnDto[];
};

export default BoardDto;
