import { Strategy as DropboxOAuth2Strategy } from "passport-dropbox-oauth2"
import { getBaseUrl } from "utils/config"

import { defaultOauth2Verify } from "./utils"

const dropboxLogin = new DropboxOAuth2Strategy(
    {
        apiVersion: "2",
        clientID: process.env.DROPBOX_CLIENT_ID,
        clientSecret: process.env.DROPBOX_CLIENT_SECRET,
        callbackURL: `${getBaseUrl()}/api/auth/dropbox-oauth2/callback`,
    },
    defaultOauth2Verify
)

export default dropboxLogin
