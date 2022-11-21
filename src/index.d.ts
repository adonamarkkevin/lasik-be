declare namespace NodeJS {
    interface ProcessEnv {
        DB_HOST: string;
        DB_PORT: string;
        DB_USER: string;
        DB_PASS: string;
        DB_NAME: string;
        PORT: string;
        SALT_ROUNDS: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
    }
}
