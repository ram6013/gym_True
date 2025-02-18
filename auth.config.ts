import { getUser } from "@/app/(auth)/login/actions";

import { NextAuthConfig } from "next-auth";

export const authConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    trustHost: true,
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname.startsWith("/login");

            if (isLoggedIn) {
                if (isOnLoginPage) {
                    return Response.redirect(new URL("/", nextUrl));
                }
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                const user1 = await getUser(user.email!);
                if (user1){
                    token = { ...token, user : user1 };
                }
            }

            return token;
        },
        async session({ session, token }) {

            if (token.user) {
                // @ts-ignore
                session.user = token.user;
            }
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
