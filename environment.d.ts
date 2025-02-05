declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            AUTH_SECRET: string;
        }
    }
}

export {};
