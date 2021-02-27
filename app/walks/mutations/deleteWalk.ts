import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteWalk = z
    .object({
        id: z.number(),
    })
    .nonstrict()

export default resolver.pipe(
    resolver.zod(DeleteWalk),
    resolver.authorize(),
    async ({ id }, ctx) => {
        // TODO: in multi-tenant app, you must add validation to ensure correct tenant
        const walk = await db.walk.deleteMany({ where: { id, userId: ctx.session.userId } })

        return walk
    }
)
