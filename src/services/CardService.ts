import { handleRequestError } from "@/lib/utils";
import Card from "@/models/card.type";
import Response from "@/models/response.type";
import { CardCreateFormType } from "@/models/schema/card-create-form.type";
import StatusObjectCard from "@/models/status-object/satus-object-card.type";
import { AxiosInstance } from "axios";


export default class CardService {
  private readonly service: AxiosInstance;

  constructor(axiosService: AxiosInstance) {
    this.service = axiosService;
  }

  async updateCard(id: string, card: CardCreateFormType): Promise<Response<Card>> {
    try {
      const response = await this.service.put<Card>(`/cards/${id}`, card);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async moveTo(cardId: string, newColumnId: string, card: CardCreateFormType): Promise<Response<Card>> {
    try {
      const response = await this.service.put<Card>(`/cards/${cardId}/move-to/${newColumnId}`, card);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async deleteCard(id: string, card: CardCreateFormType): Promise<Response<StatusObjectCard>> {
    try {
      const response = await this.service.post<StatusObjectCard>(`/cards/${id}/delete`, card);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }

  async createCard(card: CardCreateFormType): Promise<Response<Card>> {
    try {
      const response = await this.service.post<Card>("/cards/", card);
      return { data: response.data };
    } catch (error) {
      return handleRequestError(error);
    }
  }
}
