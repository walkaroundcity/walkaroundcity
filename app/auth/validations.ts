import * as z from "zod"

export const LoginInput = z.object({
    email: z.string().email(),
})
