import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  UpdateKanbanSchema,
  UpdateKanbanSchemaType,
} from "@/models/schema/update-kanban-form.type";
import { zodResolver } from "@hookform/resolvers/zod";

type EditKanbanModalProps = {
  kanbanName: string;
  onSubmit: (data: UpdateKanbanSchemaType) => void;
};

export default function EditKanbanModal({
  kanbanName,
  onSubmit,
}: EditKanbanModalProps) {
  const form = useForm<UpdateKanbanSchemaType>({
    resolver: zodResolver(UpdateKanbanSchema),
    defaultValues: {
      name: kanbanName,
    },
  });

  function handleSumbit(data: UpdateKanbanSchemaType) {
    onSubmit(data);
    setOpen(false);
    form.reset();
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le Kanban</DialogTitle>
          <DialogDescription>
            Modifiez le nom du tableau Kanban
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSumbit)}
          className="w-full space-y-6"
        >
          <div>
            <label
              htmlFor="description"
              className="name text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <Input id="name" {...form.register("name")} />
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Annuler
            </Button>
            <Button type="submit" onClick={(e) => e.stopPropagation()}>
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
