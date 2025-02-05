declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            AUTH_SECRET: string;
            SUPABASE_KEY: string;
            SUPABASE_URL: string;
        }
    }
}

export {};
