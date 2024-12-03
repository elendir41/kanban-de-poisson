import {
  ColumnCreateSchema,
  ColumnCreateSchemaType,
} from "@/models/schema/column-create-form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import useCrudColumn from "@/hooks/useCrudColumn";
import { Card } from "./ui/card";

export default function AddColumnContainer() {
  const [editing, setEditing] = useState(false);
  const { onCreate } = useCrudColumn();

  const form = useForm<ColumnCreateSchemaType>({
    resolver: zodResolver(ColumnCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  function handleStartEditing() {
    setEditing(true);
    form.reset();
  }

  function handleEndEditing() {
    setEditing(false);
  }

  async function onSubmit(data: ColumnCreateSchemaType) {
    await onCreate(data.name);
    handleEndEditing();
  }

  return (
    <Card className="min-h-full flex p-6 bg-gray-50 w-80 z-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`w-full space-y-6 ${editing ? "block" : "hidden"}`}
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
          <div className="flex w-full gap-2">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={handleEndEditing}
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Ajouter
            </Button>
          </div>
        </form>
      </Form>
      <div
        className={`w-full flex justify-center items-center ${
          !editing ? "block" : "hidden"
        }`}
      >
        <Button
          variant="ghost"
          className="text-lg"
          onClick={handleStartEditing}
        >
          + Ajouter une colonne
        </Button>
      </div>
    </Card>
  );
}
