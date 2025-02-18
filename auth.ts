import { getUser } from "@/app/(auth)/login/actions";
import { LoginRequestSchema } from "@/types";
import { compare } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

// @ts-ignore
export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials =
                    LoginRequestSchema.safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                const dbUser = await getUser(email, "email");
                if (!dbUser) {
                    console.log("User not found");
                    return null;
                }

                const passwordsMatch = await compare(
                    password,
                    dbUser.hashed_password
                );
                if (!passwordsMatch) {
                    console.error("Invalid credintials");
                    return null;
                }

                return dbUser;
            },
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
        }),
    ],
});
