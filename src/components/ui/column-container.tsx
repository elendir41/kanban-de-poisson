import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { ReactNode } from "react";
import DeleteModal from "../DeleteModal";
import { Card, CardContent, CardHeader } from "./card";
import EditColumnDialog from "../EditColumnDialog";
import { Separator } from "@radix-ui/react-separator";

type ColumnContainerProps = {
  title: string;
  columnId: string;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  onDelete: () => void;
  children: ReactNode;
};

export default function ColumnContainer({
  title,
  columnId,
  attributes,
  listeners,
  onDelete,
  children,
}: ColumnContainerProps) {
  return (
    <Card className="min-h-full flex flex-col bg-gray-100 w-80">
      <CardHeader className="p-3">
        <div className="w-full rounded flex justify-between items-center">
          <h2 {...attributes} {...listeners} className=" min-w-48">
            {title}
          </h2>
          <EditColumnDialog columnId={columnId}/>
          <DeleteModal type="column" onDelete={onDelete} />
        </div>
      </CardHeader>
      <Separator className="bg-gray-400 h-[1px] mx-3"/>
      <CardContent className="overflow-auto flex flex-col gap-2 p-3">{children}</CardContent>
    </Card>
  );
}
