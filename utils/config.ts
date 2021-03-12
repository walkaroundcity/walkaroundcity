export const constants = {
    appName: "walkaroundcity",
    baseUrl: "https://walkaround.city",
    routes: {
        home: "/",
        login: "/login",
        logout: "/logout",
        dashboard: "/dashboard",
        twitterAuth: "/api/auth/twitter",
        googleAuth: "/api/auth/google",
        facebookAuth: "/api/auth/facebook",
        microsoftAuth: "/api/auth/microsoft",
        dropboxAuth: "/api/auth/dropbox-oauth2",
        adobeAuth: "/api/auth/adobe",
        githubAuth: "/api/auth/github",
    },
}

export const getBaseUrl = (): string => {
    if (process.env.VERCEL_ENV === "production") return constants.baseUrl
    return process.env.VERCEL_URL || process.env.BLITZ_DEV_SERVER_ORIGIN || constants.baseUrl
}
