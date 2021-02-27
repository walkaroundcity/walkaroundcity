import db from "db"
import MagicLoginStrategy from "passport-magic-login"
import { constants, getBaseUrl } from "utils/config"
import icons from "utils/icons"
import { sendMail } from "utils/sendMail"

const magicLogin = new MagicLoginStrategy({
    callbackUrl: `${getBaseUrl()}/api/auth/magiclogin/callback`,
    confirmUrl: `${getBaseUrl()}/api/auth/magiclogin/confirm`,
    secret: process.env.SESSION_SECRET_KEY,
    sendMagicLink(destination: string, href: string, verificationCode: string, req: any) {
        const locale = req.headers["accept-language"].split(";")[0].split(",")[1]

        const en = {
            subject: `${icons.key} log in to ${constants.appName}`,
            html: `
            <a href="${href}">
                Click here to log in
            </a>
          `,
        }

        const de = {
            subject: `${icons.key} Anmeldung bei ${constants.appName}`,
            html: `
            <a href="${href}">
                Klicken Sie hier, um sich einzuloggen
            </a>
          `,
        }

        const msg = {
            to: destination,
            subject: locale === "de" ? de.subject : en.subject,
            html: locale === "de" ? de.html : en.html,
        }

        return sendMail(msg)
    },
    async verify(payload, verifyCallback) {
        const user = await db.user.upsert({
            where: { email: payload.destination },
            create: { email: payload.destination, role: "USER" },
            update: { email: payload.destination },
        })
        const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "magiclogin",
        }
        verifyCallback(undefined, { publicData })
    },
})

export default magicLogin
