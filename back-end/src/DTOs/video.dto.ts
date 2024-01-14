import { z } from 'zod';

export const CreateVideoSchema = z.object({
    title: z
        .string()
        .min(4, { message: "title must be 4 or more characters long" })
        .max(100, { message: "title must be 100 or fewer characters long" }),
    description: z.
        string()
        .min(20, { message: "description must be 20 or more characters long" })
        .max(500, { message: "description must be 500 or fewer characters long" }),
    video:z
    .string(),
    thumbnail:z.string(),
    categoriesIds: z.array(z.number()).optional()
});

export type CreateVideoDto = z.infer<typeof CreateVideoSchema>;
