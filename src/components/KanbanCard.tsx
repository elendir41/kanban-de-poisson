import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateKanbanSchemaType } from "@/models/schema/update-kanban-form.type";
import { getFishImage, getPastelColor } from "@/lib/KanbanCardStyle";
import DeleteKanbanModal from "./DeleteKanbanModal";
import EditKanbanModal from "./EditKanbanModal";
import useCrudKanban from "@/hooks/useCrudKanban";

type KanbanCardProps = {
  id: string;
  title: string;
  footer?: string;
  editable?: boolean;
  onDelete: () => void;
  disableHover?: boolean;
};

export default function KanbanCard({
  id,
  title,
  footer,
  editable,
  disableHover,
}: KanbanCardProps) {
  const navigate = useNavigate();
  const [kanbanName, setKanbanName] = useState(title);

  const fishImage = getFishImage(title);
  const backgroundColor = getPastelColor(title);

  const { onUpdate, onDelete } = useCrudKanban();

  const onSubmit = async (data: UpdateKanbanSchemaType) => {
    const updatedName = await onUpdate(id, data.name);
    if (updatedName) {
      setKanbanName(updatedName);
    }
  };

  const confirmDelete = () => {
    onDelete(id);
  };

  const handleCardClick = () => {
    navigate(`/kanban/${id}`);
  };

  return (
    <Card
      className={`w-60 h-60 flex flex-col relative transition-colors duration-200 group ${backgroundColor} ${
        disableHover ? "" : "hover:bg-opacity-75 cursor-pointer"
      }`}
      onClick={disableHover ? undefined : handleCardClick}
    >
      {editable && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <EditKanbanModal kanbanName={kanbanName} onSubmit={onSubmit} />
          <DeleteKanbanModal onDelete={confirmDelete} />
        </div>
      )}
      <CardHeader className="h-4/6 flex items-center justify-center pb-2">
        {title === "+" ? (
          <CardTitle className="text-4xl">{title}</CardTitle>
        ) : (
          <img
            src={`${fishImage}`}
            alt={kanbanName}
            className="w-24 h-24"
          />
        )}
      </CardHeader>
      <Separator className="bg-gray-300" />
      <CardContent className="flex-1 flex items-center justify-center py-4">
        <CardDescription className="text-base font-medium text-gray-700">
          {kanbanName}
        </CardDescription>
      </CardContent>
      {footer && (
        <>
          <CardFooter className="h-5 flex items-center justify-center">
            <CardDescription className="text-xs text-gray-400 italic">
              {footer}
            </CardDescription>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
