import { Strategy as TwitterStrategy } from "passport-twitter"
import { getBaseUrl } from "utils/config"

import { defaultOauth2Verify } from "./utils"

const twitterLogin = new TwitterStrategy(
    {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: `${getBaseUrl()}/api/auth/twitter/callback`,
        includeEmail: true,
    },
    defaultOauth2Verify
)

export default twitterLogin
