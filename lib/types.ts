import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    });

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    });

export const blogPostSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(2, "Title must be at least 2 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    content: z.string().min(20, "Content must be at least 20 characters long"),
    author: z.number().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
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
export type TBlogPostSchema = z.infer<typeof blogPostSchema>;