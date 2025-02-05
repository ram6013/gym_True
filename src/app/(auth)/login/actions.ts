"use server";

import { LoginRequestSchema } from "@/types";
import { User } from "next-auth";
import { z } from "zod";
import { signIn } from "../../../../auth";

export type IUser = User & z.infer<typeof DBUserSchema>;

export async function getUser(
    identifier: string | number,
    type: "email" | "id" | "access_token"
): Promise<IUser | undefined> {
    // TODO: Get user from db

    return undefined;
}

export interface LoginActionState {
    status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export async function login(
    _: LoginActionState,
    formData: FormData
): Promise<LoginActionState> {
    const { data: parsedData, error } = LoginRequestSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (error) {
        console.error(error);
        return { status: "invalid_data" };
    }
    try {
        await signIn("credentials", { ...parsedData, redirect: false });
        return { status: "success" };
    } catch (e) {
        return { status: "failed" };
    }
}

const DBUserSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
    hashed_password: z.string(),
    access_token: z.string(),
});
