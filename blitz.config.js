const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")

module.exports = {
    middleware: [
        sessionMiddleware({
            isAuthorized: simpleRolesIsAuthorized,
        }),
    ],
    i18n: {
        locales: ["en", "de"],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: "en",
    },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "pbs.twimg.com",
            "platform-lookaside.fbsbx.com",
            "lh3.googleusercontent.com",
        ],
    },
    /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
