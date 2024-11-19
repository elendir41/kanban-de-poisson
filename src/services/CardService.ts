import CardDto from "@/models/dto/cardDto.type";
import Response from "@/models/response.type";
import { CardCreateForm } from "@/models/schema/card-create-form.type";
import StatusObjectCard from "@/models/status-object/satus-object-card.type";
import axios, { AxiosInstance } from "axios";


export default class CardService {
  private readonly service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: `${import.meta.env.VITE_KANBAN_API_URL}/cards`,
    });
  }

  async updateCard(id: string, card: CardCreateForm): Promise<Response<CardDto>> {
    try {
      const response = await this.service.put<CardDto>(`/${id}`, card);
      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return { success: false, error: error.response?.data ?? "Erreur pendant la mise à jour de la carte" };
      }
      console.error(error);
      return {
        success: false,
        error: "Erreur pendant la mise à jour de la carte",
      };
    }
  }

  async moveTo(cardId: string, newColumnId: string, card: CardCreateForm): Promise<Response<CardDto>> {
    try {
      const response = await this.service.put<CardDto>(`/${cardId}/move-to/${newColumnId}`, card);
      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return { success: false, error: error.response?.data ?? "Erreur pendant le déplacement de la carte" };
      }
      console.error(error);
      return {
        success: false,
        error: "Erreur pendant le déplacement de la carte",
      };
    }
  }

  async deleteCard(id: string): Promise<Response<StatusObjectCard>> {
    try {
      const response = await this.service.post<StatusObjectCard>(`/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return { success: false, error: error.response?.data ?? "Erreur pendant la suppression de la carte" };
      }
      console.error(error);
      return {
        success: false,
        error: "Erreur pendant la suppression de la carte",
      };
    }
  }

  async createCard(card: CardCreateForm): Promise<Response<CardDto>> {
    try {
      const response = await this.service.post<CardDto>("/", card);
      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
        return { success: false, error: error.response?.data ?? "Erreur pendant la création de la carte" };
      }
      console.error(error);
      return {
        success: false,
        error: "Erreur pendant la création de la carte",
      };
    }
  }
}
