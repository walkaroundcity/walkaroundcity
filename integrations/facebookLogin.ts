import { Strategy as FacebookStrategy } from "passport-facebook"
import { getBaseUrl } from "utils/config"

import { defaultOauth2Verify } from "./utils"

const facebookLogin = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${getBaseUrl()}/api/auth/facebook/callback`,
        profileFields: ["displayName", "email"],
    },
    defaultOauth2Verify
)

export default facebookLogin
