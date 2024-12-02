import { AxiosInstance } from "axios";
import Response from "@/models/response.type.ts";
import { handleRequestError } from "@/lib/utils";
import Board from "@/models/board.type";
import BoardDto from "@/models/dto/boardDto.type";
import StatusObjectBoard from "@/models/status-object/status-object-board.type";

export default class KanbanService {
  private readonly service: AxiosInstance;

  constructor(axiosService: AxiosInstance) {
    this.service = axiosService;
  }

  async createBoard(name: string): Promise<Response<Board>> {
    try {
      const response = await this.service.post<Board>(`/boards/${name}`);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async updateBoard(id: string, name: string): Promise<Response<Board>> {
    try {
      const response = await this.service.put<Board>(`/boards/${id}/${name}`);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async getBoard(id: string): Promise<Response<BoardDto>> {
    try {
      const response = await this.service.get<BoardDto>(`/boards/${id}`);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async getAllBoards(): Promise<Response<Board[]>> {
    try {
      const response = await this.service.get<Board[]>(`/boards/`);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async deleteBoard(id: string): Promise<Response<StatusObjectBoard>> {
    try {
      const response = await this.service.delete<StatusObjectBoard>(
        `/boards/${id}`
      );
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }
}
