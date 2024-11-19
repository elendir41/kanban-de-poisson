import { ServiceContext } from "@/context/ServiceContext";
import CardService from "@/services/CardService";

type ServiceProviderProps = {
  children: React.ReactNode;
};

export default function ServiceProvider({ children }: ServiceProviderProps) {
  const cardService = new CardService();

  return (
    <ServiceContext.Provider value={{ cardService }}>
      {children}
    </ServiceContext.Provider>
  )
}

