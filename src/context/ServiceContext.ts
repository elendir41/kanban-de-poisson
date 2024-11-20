import CardService from "@/services/CardService";
import { createContext, useContext } from "react";
import {AxiosInstance} from "axios";
import AuthService from "@/services/AuthService.ts";

type ServiceContextType = {
  cardService: CardService;
  authService: AuthService;
  axiosService: AxiosInstance;
};

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServiceContext must be used within a ServiceContext.Provider");
  }
  return context;
}
