import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    });

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    });

export const signupResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    accessToken: z.string(),
    authentication: z.object({
        strategy: z.string(),
        payload: z.any(),
    })
});

export const loginResponseSchema = z.object({
    accessToken: z.string(),
    authentication: z.object({
        strategy: z.string(),
        payload: z.any(),
    }),
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    })
});


export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;