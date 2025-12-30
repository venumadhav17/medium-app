import z from "zod";

export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
}); // runtime variable

export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6)
}); // runtime variable

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string()
}); // runtime variable

export const UpdateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number()
});

//type inference in zod
export type SignupInput = z.infer<typeof signupInput>;

export type SigninInput = z.infer<typeof signinInput>;

export type CreateBlogInput = z.infer<typeof createBlogInput>;

export type UpdateBlogInput = z.infer<typeof UpdateBlogInput>;
