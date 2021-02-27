import { NotFoundError, resolver } from "blitz"
import db from "db"
import * as z from "zod"

const GetWalk = z.object({
    shortname: z.string().optional(),
})

export default resolver.pipe(resolver.zod(GetWalk), resolver.authorize(), async ({ shortname }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const walk = await db.walk.findFirst({ where: { shortname } })

    if (!walk) throw new NotFoundError()

    return walk
})
