import Board from "@/components/Board";
import BoardSkeleton from "@/components/Skeleton/BoardSkeleton";
import { Button } from "@/components/ui/button";
import useFetchKanban from "@/hooks/useFetchKanban";
import DragAndDropProvider from "@/provider/DragAndDropProvider";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Kanban() {
  let params = useParams();
  const navigate = useNavigate();

  const boardId = params.id;

  if (!boardId) {
    return <Navigate to="/404" />;
  }

  const { isLoading, error } = useFetchKanban(boardId);

  if (isLoading) {
    return <BoardSkeleton />;
  }

  if (error) {
    return <div className="w-full h-full grid place-items-center">
      <div>
        <h1 className="text-4xl font-bold">Erreur</h1>
        <div className="flex gap-2 items-center">
          <p className="text-xl">Une erreur est survenue lors de la récupération de la board</p>
          <Button onClick={() => navigate("/")} >Retour</Button>
        </div>
      </div>
    </div>;
  }

  return (
    <DragAndDropProvider>
      <Board />
    </DragAndDropProvider>
  );
}
