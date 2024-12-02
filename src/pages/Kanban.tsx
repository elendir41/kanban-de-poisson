import Board from "@/components/Board";
import useFetchKanban from "@/hooks/useFetchKanban";
import { useNavigate, useParams } from "react-router-dom";

export default function Kanban() {
  let params = useParams();
  const navigate = useNavigate();

  const boardId = params.id;

  if (!boardId) {
    navigate("/404");
    return;
  }

  const { isLoading, error } = useFetchKanban(boardId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <Board />;
}
