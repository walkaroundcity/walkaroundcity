import { Chance } from "chance"
import db from "db"

import { shortName } from "./uniqueShortname"

export const chance = new Chance()

export const createFakeUser = () =>
    db.user.create({
        data: {
            email: chance.email(),
            name: chance.name(),
            profile_picture: "https://thispersondoesnotexist.com/image",
        },
    })

export const createFakeUsers = (amount: number = 1) =>
    Promise.all(new Array(amount).fill(null).map(() => createFakeUser()))

export const createFakeWalk = (userId: number) =>
    db.walk.create({
        data: { userId, title: `walk around ${chance.city()}`, shortname: shortName() },
    })

export const createFakeWalks = (userId: number, amount: number = 1) =>
    Promise.all(new Array(amount).fill(null).map(() => createFakeWalk(userId)))

export const createFakeStop = (walkId: number, sequence: number) =>
    db.stop.create({ data: { walkId, title: `Stop at ${chance.company()}`, sequence } })

export const createFakeStops = (walkId: number, amount: number = 1) =>
    Promise.all(new Array(amount).fill(null).map((_value, index) => createFakeStop(walkId, index)))
