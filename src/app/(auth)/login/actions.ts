"use server";

import supabase from "@/lib/supabase";
import { LoginRequestSchema } from "@/types";
import { Session, User } from "next-auth";
import { z } from "zod";
import { signIn } from "../../../../auth";

export type IUser = User & z.infer<typeof DBUserSchema>;
export type Isession = Session & { user: IUser };
export async function getUser(
    identifier: string | number,
    type: "email" | "id" = "email"
): Promise<IUser | undefined> {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq(type, identifier).returns<IUser[]>();
    if (error || !data[0]) {
        console.error(error);
        return undefined;
    }
    const rowUser = data[0];
    const parsedData = DBUserSchema.safeParse(rowUser);
    if (!parsedData.success) {
        console.error(parsedData.error);
        return undefined;
    }
    return data[0] as IUser;
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
        await signIn("credentials", {
            email: parsedData.email,
            password: parsedData.password,
            redirect: false,
        });
        return { status: "success" };
    } catch (e) {
        console.error(e);
        return { status: "failed" };
    }
}

const DBUserSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
    hashed_password: z.string(),
});
