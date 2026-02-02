import z from "zod";

export const registerSchema = z.object({
    displayName: z.string().min(2, { error: "Display name is required" }),
    email: z.email({ error: "Invalid email address" }),
    password: z.string().min(6, { error: "Password must be at least 6 characters long" })
})

export type RegisterSchema = z.infer<typeof registerSchema>;