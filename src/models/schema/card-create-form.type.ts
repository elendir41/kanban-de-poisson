import { z } from "zod";

const CardCreateFormSchema = z.object({
  title: z.string(),
  body: z.string(),
  columnId: z.string(),
  boardId: z.string(),
  rank: z.number(),
});

type CardCreateForm = z.infer<typeof CardCreateFormSchema>;

export { CardCreateFormSchema };
export type { CardCreateForm };
