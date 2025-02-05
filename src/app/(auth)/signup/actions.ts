"use server";
import { genSaltSync, hashSync } from "bcrypt-ts";

import { CreateUserRequestSchema, TCreateUser } from "@/types";
import { signIn } from "next-auth/react";
import { getUser } from "../login/actions";
import supabase from "@/lib/supabase";

export interface RegisterActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  const validatedData = CreateUserRequestSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) return { status: "failed" };

  const { email, password } = validatedData.data;

  const { err: createErr } = await createUser({
    email,
    password,
  });
  if (createErr) {
    console.error(createErr);
    return {
      status: "failed",
    };
  }

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return { status: "success" };
};

async function createUser(options: TCreateUser) {
  const { data: parsedData, error: parsedError } =
    CreateUserRequestSchema.safeParse(options);
  if (parsedError) {
    return { err: parsedError.message };
  }

  const { email, password } = parsedData;

  const user = await getUser(email, "email");

  if (user) {
    return { err: "user_exists" };
  }

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  const finalUser = {
    email: parsedData.email,
    hashed_password: hash,
  };

  // TODO: Insert user to db
  const { data, error: insertError } = await supabase
    .from("users")
    .insert(finalUser)
    .select("id");
  if (insertError) {
    return { err: insertError.message };
  }
  return {
    data: { ...finalUser, id: data[0].id },
  };
}
