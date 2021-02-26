import { PrismaClient } from "@prisma/client"
import { enhancePrisma } from "blitz"

const EnhancedPrisma = enhancePrisma(PrismaClient)

export * from "@prisma/client"

type GlobalWithPrisma = NodeJS.Global &
    typeof globalThis & {
        __prisma__: PrismaClient
    }

const globalWithPrisma = global as GlobalWithPrisma

const getPrisma = (): PrismaClient => {
    if (!globalWithPrisma.__prisma__) {
        globalWithPrisma.__prisma__ = new EnhancedPrisma()
    }
    return globalWithPrisma.__prisma__
}

export default getPrisma()
