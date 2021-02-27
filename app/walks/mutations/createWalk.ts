import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateWalk = z
    .object({
        title: z.string(),
        shortname: z.string(),
    })
    .nonstrict()

export default resolver.pipe(resolver.zod(CreateWalk), resolver.authorize(), async (input, ctx) => {
    const walk = await db.walk.create({ data: { ...input, userId: ctx.session.userId } })

    return walk
})
