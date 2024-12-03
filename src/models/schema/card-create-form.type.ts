import { z } from "zod";

const CardCreateFormSchema = z.object({
  title: z.string({message: "Le titre est obligatoire"}).min(1, "Le titre est obligatoire"),
  body: z.string({message: "La description est obligatoire"}),
  columnId: z.string({message: "Une erreur est survenue avec la colonne"}).min(1, "Une erreur est survenue avec la colonne"),
  boardId: z.string({message: "Une erreur est survenue avec le kanban"}).min(1, "Une erreur est survenue avec le kanban"),
  rank: z.coerce.number({message: "Une erreur est survenue avec le rang"}).min(0, "Une erreur est survenue avec le rang"),
});

type CardCreateFormType = z.infer<typeof CardCreateFormSchema>;

export { CardCreateFormSchema };
export type { CardCreateFormType };
