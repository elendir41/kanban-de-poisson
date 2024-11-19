import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import Card from "@/models/card.type";

type TaskCardModalProps = {
  card: Card;
  onUpdate: (card: Card) => Promise<void>;
  onDelete: (id: string) => Promise<void>
};

export default function TaskCardModal({ card, onUpdate, onDelete }: TaskCardModalProps) {
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
  };

  const handleDelete = () => {
    onDelete(card.id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pen size={24} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Task</AlertDialogTitle>
        </AlertDialogHeader>
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
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            <Trash size={16} />
            Delete
          </Button>
          <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
