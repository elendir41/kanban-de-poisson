import { useServiceContext } from "@/context/ServiceContext";
import { useNavigate } from "react-router-dom";

export default function useLogOut() {
  const navigate = useNavigate();
  const authService = useServiceContext().authService;

  function handleLogOut() {
    authService.logout();
    navigate("/login");
  }

  return handleLogOut;
}
