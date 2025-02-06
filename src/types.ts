import { z } from "zod";

export const CreateUserRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});
export type TCreateUser = z.infer<typeof CreateUserRequestSchema>;

export const LoginRequestSchema = CreateUserRequestSchema;
export type TLoginRequest = z.infer<typeof LoginRequestSchema>;

export const WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

export type WeekDay = (typeof WEEKDAYS)[keyof typeof WEEKDAYS];
