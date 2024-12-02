import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import Card from "@/models/card.type";

type TaskCardModalProps = {
  card: Card;
  onUpdate: (card: Card) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TaskCardModal({
  card,
  onUpdate,
  onDelete,
}: TaskCardModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [body, setBody] = useState(card.body);

  const handleSave = () => {
    const updatedCard = {
      ...card,
      title,
      body,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedCard);
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(card.id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2"
        >
          <Pen size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Task Description"
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            <Trash size={16} />
            Delete
          </Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
