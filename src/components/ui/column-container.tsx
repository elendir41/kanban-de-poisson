import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { ReactNode } from "react";

type ColumnContainerProps = {
  title: string;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  children: ReactNode;
};

export default function ColumnContainer({title, attributes, listeners, children }: ColumnContainerProps) {
  return (
    <div className="min-h-full flex flex-col gap-2 p-4 rounded border border-black bg-white">
      <h2
        {...attributes}
        {...listeners}
        className="bg-gray-600 p-3 w-full rounded text-white min-w-48"
      >
        {title}
      </h2>
      <div className="overflow-auto flex flex-col gap-2">
        {children}
      </div>
    </div>
  )
}

