import { z } from "zod";

const ColumnCreateSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "La Column doit avoir un nom",
    })
    .max(50, {
      message: "Le nom de la Column ne doit pas dépasser 50 caractères",
    }),
});

type ColumnCreateSchemaType = z.infer<typeof ColumnCreateSchema>;

export { ColumnCreateSchema };
export type { ColumnCreateSchemaType };
