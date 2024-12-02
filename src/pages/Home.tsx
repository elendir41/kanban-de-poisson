import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return <div>Kanban de poisson

    <Button onClick={() => navigate("/kanban/39bd32e9-f6be-4df7-aa48-92c5caac4ce8")}>kanban</Button>
  </div>;
}
