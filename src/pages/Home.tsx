import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useLogOut from "@/hooks/useLogout";

export default function Home() {
  const logOut = useLogOut();
  const navigate = useNavigate();

  return (
    <div>
      Kanban de poisson
      <Button onClick={logOut}>Logout</Button>
      <Button
        onClick={() => navigate("/kanban/39bd32e9-f6be-4df7-aa48-92c5caac4ce8")}
      >
        kanban
      </Button>
    </div>
  );
}
