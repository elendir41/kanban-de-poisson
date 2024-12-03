import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full grid place-items-center">
      <div>
        <h1 className="text-4xl font-bold">404 - Page non trouvée</h1>
        <p className="text-xl">La page que vous cherchez n'existe pas.</p>
        <Button onClick={() => navigate("/")}>Retour a l'accueil</Button>
      </div>
    </div>
  );
}
