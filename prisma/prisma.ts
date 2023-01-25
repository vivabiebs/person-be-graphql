import { PrismaClient } from '@prisma/client'

declare global {
    namespace GraphQL {
        interface Global {
            prisma: PrismaClient
        }
    }
}

let prisma: PrismaClient;

export {prisma};