import { handleRequestError } from "@/lib/utils";
import CardDto from "@/models/dto/cardDto.type";
import Response from "@/models/response.type";
import { CardCreateForm } from "@/models/schema/card-create-form.type";
import StatusObjectCard from "@/models/status-object/satus-object-card.type";
import { AxiosInstance } from "axios";


export default class CardService {
  private readonly service: AxiosInstance;

  constructor(axiosService: AxiosInstance) {
    this.service = axiosService;
  }

  async updateCard(id: string, card: CardCreateForm): Promise<Response<CardDto>> {
    try {
      const response = await this.service.put<CardDto>(`/${id}`, card);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async moveTo(cardId: string, newColumnId: string, card: CardCreateForm): Promise<Response<CardDto>> {
    try {
      const response = await this.service.put<CardDto>(`/${cardId}/move-to/${newColumnId}`, card);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async deleteCard(id: string): Promise<Response<StatusObjectCard>> {
    try {
      const response = await this.service.post<StatusObjectCard>(`/${id}`);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async createCard(card: CardCreateForm): Promise<Response<CardDto>> {
    try {
      const response = await this.service.post<CardDto>("/", card);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }
}
