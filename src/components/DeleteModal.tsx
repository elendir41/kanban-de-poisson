import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  onDelete: () => void;
  type: "kanban" | "column" | "card";
};

function typeToTitle(type: DeleteModalProps["type"]) {
  switch (type) {
    case "kanban":
      return "ce Kanban";
    case "column":
      return "cette Colonne";
    case "card":
      return "cette Carte";
  }
}

export default function DeleteModal({
  onDelete,
  type,
}: DeleteModalProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteDialogOpen(true);
          }}
        >
          <Trash2 className="text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer {typeToTitle(type)} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteDialogOpen(false);
            }}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteDialogOpen(false);
              onDelete();
            }}
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
