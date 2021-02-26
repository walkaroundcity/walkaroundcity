import db from "db"

export const defaultOauth2Verify = async (_accessToken, _refreshToken, profile, done) => {
    console.debug(profile)
    const email = profile.emails && profile.emails[0]?.value
    const profile_picture = profile.photos && profile.photos[0].value
    if (!email) {
        return done(
            new Error(
                `${profile.provider} OAuth response didn't provide an email. Are the scopes correct?`
            )
        )
    }
    const user = await db.user.upsert({
        where: { email },
        create: {
            email,
            name: profile.displayName,
            profile_picture,
        },
        update: { email, name: profile.displayName, profile_picture },
    })
    const publicData = {
        userId: user.id,
        roles: [user.role],
        source: profile.provider,
        profile_picture: user.profile_picture,
    }
    done(null, { publicData })
}
