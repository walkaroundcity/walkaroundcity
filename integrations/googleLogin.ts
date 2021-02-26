import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth"
import { getBaseUrl } from "utils/config"

import { defaultOauth2Verify } from "./utils"

const googleLogin = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${getBaseUrl()}/api/auth/google/callback`,
    },
    defaultOauth2Verify
)

export default googleLogin
