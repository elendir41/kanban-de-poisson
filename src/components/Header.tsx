import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import useLogOut from "@/hooks/useLogout";

export default function Header() {
  const handleLogOut = useLogOut();
  return (
    <>
      <div className="flex justify-center text-3xl font-bold p-6">
        <Link className="ml-auto" to="/">
          KANBAN DE POISSON
        </Link>
        <Button
          size="icon"
          variant="destructive"
          className="ml-auto"
          onClick={handleLogOut}
        >
          <LogOut />
        </Button>
      </div>
      <Separator />
    </>
  );
}
