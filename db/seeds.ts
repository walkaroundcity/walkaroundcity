import { createFakeStops, createFakeUsers, createFakeWalks } from "utils/fake"

require("dotenv-flow").config({ silent: true })

/*
 * This seed function is executed when you run `blitz db seed`.
 */
const seed = async () => {
    if (["preview", "development"].includes(process.env.VERCEL_ENV as string)) {
        const users = await createFakeUsers(5)
        await Promise.all(
            users.map(async (user) => {
                const walks = await createFakeWalks(user.id, 5)
                return Promise.all(walks.map((walk) => createFakeStops(walk.id, 5)))
            })
        )
    }
}

export default seed
