import { getUser } from "@/app/(auth)/login/actions";
import { LoginRequestSchema } from "@/types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

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

                const hashedPassword = password.repeat(3);

                if (!dbUser || hashedPassword !== dbUser?.hashed_password) {
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
