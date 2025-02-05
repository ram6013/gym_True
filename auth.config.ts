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
                token = { ...token, user };
            }

            return token;
        },
        async session({ session, token }) {
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
