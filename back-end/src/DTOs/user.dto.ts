import { z } from 'zod';
import validator from 'validator';
import { UserRole } from '../interfaces/userRole.enum';

export const CreateUserSchema = z.object({
    name: z
        .string()
        .min(4, { message: "username must be 4 or more characters long" })
        .max(24, { message: "username must be 24 or fewer characters long" })
        .transform(str => validator.escape(str)),
    profile: z.
        string().
        optional()
        .transform(str => str ? validator.escape(str) : str),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .transform(str => validator.escape(str)),
    password: z
        .string()
        .min(8, { message: 'Password must be 8 characters minimum' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one capital letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .transform(str => validator.escape(str)),
    role: z
        .nativeEnum(UserRole)
        .default(UserRole.USER)
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const LoginUserSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .transform(str => validator.escape(str)),
    password: z
        .string()
        .min(8, { message: 'Password must be 8 characters minimum' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one capital letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .transform(str => validator.escape(str))
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;


export const GetUserSchema = z.object({
    name: z.string(),
    profile:z.string(),
});

export type GetUserDto = z.infer<typeof GetUserSchema>;
