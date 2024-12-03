import { AxiosInstance } from "axios";
import Response from "@/models/response.type.ts";
import { handleRequestError } from "@/lib/utils";
import Column from "@/models/column.type";
import StatusObjectColumn from "@/models/status-object/status-object-column.type";

export default class ColumnService {
  private readonly service: AxiosInstance;

  constructor(axiosService: AxiosInstance) {
    this.service = axiosService;
  }

  async createColumn(boardId: string, name: string): Promise<Response<Column>> {
    try {
      const response = await this.service.post<Column>(
        `/columns/board/${boardId}/name/${name}`
      );
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async updateColumn(column: Column): Promise<Response<Column>> {
    try {
      const response = await this.service.put<Column>(`/columns/`, column);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async deleteColumn(id: string): Promise<Response<StatusObjectColumn>> {
    try {
      const response = await this.service.delete<StatusObjectColumn>(
        `/columns/${id}`
      );
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async getAllColumns(boardId: string): Promise<Response<Column[]>> {
    try {
      const response = await this.service.get<Column[]>(
        `/columns/board/${boardId}`
      );
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }
}
