import { ServiceContext } from "@/context/ServiceContext";
import CardService from "@/services/CardService";
import axios from "axios";
import AuthService from "@/services/AuthService.ts";
import ColumnService from "@/services/ColumnService";
import KanbanService from "@/services/KanbanService";

type ServiceProviderProps = {
  children: React.ReactNode;
};

export default function ServiceProvider({ children }: ServiceProviderProps) {
  const axiosService = axios.create({
    baseURL: `${import.meta.env.VITE_KANBAN_API_URL}/`,
  });

  const cardService = new CardService(axiosService);
  const authService = new AuthService(axiosService);
  const columnService = new ColumnService(axiosService);
  const kanbanService = new KanbanService(axiosService);

  return (
    <ServiceContext.Provider
      value={{ cardService, authService, axiosService, columnService, kanbanService }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
