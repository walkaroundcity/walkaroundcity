import { User } from "@prisma/client"
import { SimpleRolesIsAuthorized } from "blitz"
import { DefaultCtx, SessionContext } from "blitz"

declare module "*.module.scss" {
    const content: { [className: string]: string }
    export default content
}

declare module "*.module.css" {
    const content: { [className: string]: string }
    export default content
}

declare module "blitz" {
    export interface Ctx extends DefaultCtx {
        session: SessionContext
    }
    export interface Session {
        isAuthorized: SimpleRolesIsAuthorized<User["role"]>
        PublicData: {
            userId: User["id"]
            role: User["role"]
        }
    }
}
