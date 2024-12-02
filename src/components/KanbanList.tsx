import AddKanban from "@/components/AddKanban.tsx";
import KanbanCard from "@/components/KanbanCard.tsx";
import useKanbanStore from "@/stores/kanban-store";
import useCrudKanban from "@/hooks/useCrudKanban";
import { formatUpdatedAt } from "@/lib/utils";

export default function KanbanList() {
  const kanbanList = useKanbanStore((state) => state.kanbanList);

  const { onDelete, onCreate } = useCrudKanban();

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleAdd = (name: string) => {
    onCreate(name);
  };

  return (
    <div className="p-2 flex flex-wrap">
      <div className="p-2">
        <AddKanban onAdd={handleAdd} />
      </div>
      {kanbanList.map((kanban, index) => (
        <div className="p-2" key={`${kanban.id}-${index}`}>
          <KanbanCard
            id={kanban.id}
            title={kanban.name}
            footer={formatUpdatedAt(kanban.updatedAt)}
            editable={true}
            onDelete={() => handleDelete(kanban.id)}
          />
        </div>
      ))}
    </div>
  );
}
