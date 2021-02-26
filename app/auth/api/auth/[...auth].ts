import { passportAuth } from "blitz"
import dropboxLogin from "integrations/dropboxLogin"
//import googleLogin from "integrations/googleLogin"
import magicLogin from "integrations/magicLogin"
import twitterLogin from "integrations/twitterLogin"

export default passportAuth({
    successRedirectUrl: "/dashboard",
    errorRedirectUrl: "/",
    secureProxy: process.env.VERCEL_ENV !== "development",
    strategies: [
        {
            strategy: magicLogin,
        },
        {
            strategy: twitterLogin,
        },
        /*{
            strategy: googleLogin,
            authenticateOptions: {
                scope: [
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile",
                ],
            },
        },*/
        {
            strategy: dropboxLogin,
        },
    ],
})
