import { z } from "zod";

const UserCredentialsSchema = z.object({
  usename: z.string(),
  password: z.string(),
});

type UserCredentials = z.infer<typeof UserCredentialsSchema>;

export { UserCredentialsSchema };
export type { UserCredentials };
