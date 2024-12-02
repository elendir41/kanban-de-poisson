import { z } from "zod";

const UpdateKanbanSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Le Kanban doit avoir un nom",
    })
    .max(50, {
      message: "Le nom du Kanban ne doit pas dépasser 50 caractères",
    }),
});

type UpdateKanbanSchemaType = z.infer<typeof UpdateKanbanSchema>;

export { UpdateKanbanSchema };
export type { UpdateKanbanSchemaType };
