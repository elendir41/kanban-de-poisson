import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  CardCreateFormType,
  CardCreateFormSchema,
} from "@/models/schema/card-create-form.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useKanbanStore from "@/stores/kanban-store";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import useCrudCard from "@/hooks/useCrudCard";

type AddCardModalProps = {
  columnId: string;
  rank: number;
};

export default function AddCardModal({ columnId, rank }: AddCardModalProps) {
  const currentBoardId = useKanbanStore((state) => state.currentBoardId);
  const { onCreate } = useCrudCard();
  const form = useForm<CardCreateFormType>({
    resolver: zodResolver(CardCreateFormSchema),
    defaultValues: {
      columnId,
      rank,
      boardId: currentBoardId,
      body: "",
      title: "",
    },
  });
  const [open, setOpen] = useState(false);

  async function onSubmit(data: CardCreateFormType) {
    setOpen(false);
    onCreate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Ajouter une carte</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une carte</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ajouter un titre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="body"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ajouter une descrition" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
