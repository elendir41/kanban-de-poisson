import CardService from "@/services/CardService";
import { createContext, useContext } from "react";

type ServiceContextType = {
  cardService: CardService;
};

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServiceContext must be used within a ServiceContext.Provider");
  }
  return context;
}
