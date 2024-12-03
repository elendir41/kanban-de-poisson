import {z} from "zod";

const LoginCredentialsSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

const RegisterCredentialsSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be at most 24 characters")
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/,
      "Password must be 8-24 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"),
  passwordConfirmation: z.string().min(1, "Password confirmation is required"),
}).superRefine(({ passwordConfirmation, password }, ctx) => {
  if (passwordConfirmation !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['passwordConfirmation']
    });
  }
});

type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;

export {LoginCredentialsSchema, RegisterCredentialsSchema};
export type {LoginCredentials, RegisterCredentials};
