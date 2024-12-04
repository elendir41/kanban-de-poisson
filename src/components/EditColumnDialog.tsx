import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColumnCreateSchema,
  ColumnCreateSchemaType,
} from "@/models/schema/column-create-form.type";
import useCrudColumn from "@/hooks/useCrudColumn";
import useKanbanStore from "@/stores/kanban-store";

type EditColumnDialogProps = {
  columnId: string;
};

export default function EditColumnDialog({ columnId }: EditColumnDialogProps) {
  const [open, setOpen] = useState(false);

  const updateColumn = useKanbanStore((state) => state.updateColumn);

  const { onUpdate } = useCrudColumn();
  const column = useKanbanStore((state) =>
    state.columns.find((c) => c.column.id === columnId)
  );

  const form = useForm<ColumnCreateSchemaType>({
    resolver: zodResolver(ColumnCreateSchema),
    defaultValues: {
      name: column?.column.name ?? "",
    },
  });

  async function onSubmit(data: ColumnCreateSchemaType) {
    if (!column) return;
    column.column.name = data.name;
    setOpen(false);
    const response = await onUpdate(column.column);
    if (response) {
      updateColumn(response);
    }
    form.reset();
  }

  if (!column) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <Pen size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier la colonne</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`w-full space-y-6`}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la colonne</FormLabel>
                  <FormControl>
                    <Input placeholder="Ajouter un nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
