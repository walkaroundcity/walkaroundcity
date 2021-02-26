type EnvBoolean = "true" | "false" | undefined

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "test" | "development" | "production"
        DEBUG: EnvBoolean
        SESSION_SECRET_KEY: string
        EMAIL_SERVER: string
        EMAIL_FROM: string
        POSTGRES_URI_WITH_SCHEMA: string
        VERCEL_ENV: "production" | "preview" | "development"
        VERCEL_URL: string
        TWITTER_CONSUMER_KEY: string
        TWITTER_CONSUMER_SECRET: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string
        FACEBOOK_APP_ID: string
        FACEBOOK_APP_SECRET: string
        AAD_CLIENT_ID: string
        AAD_CLIENT_SECRET: string
        DROPBOX_CLIENT_ID: string
        DROPBOX_CLIENT_SECRET: string
        ADOBE_CLIENT_ID: string
        ADOBE_CLIENT_SECRET: string
        GITHUB_CLIENT_ID: string
        GITHUB_CLIENT_SECRET: string
    }
}
