import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateWalk = z
    .object({
        id: z.number(),
        title: z.string(),
        shortname: z.string(),
    })
    .nonstrict()

export default resolver.pipe(
    resolver.zod(UpdateWalk),
    resolver.authorize(),
    async ({ id, ...data }, ctx) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const walk = await db.walk.update({
            where: { userId_id: { id, userId: ctx.session.userId } },
            data,
        })

        return walk
    }
)
