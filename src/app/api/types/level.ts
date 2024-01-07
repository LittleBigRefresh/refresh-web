import {User} from "./user"
import {Location} from "./location"

export interface Level {
    levelId: number
    title: string
    description: string
    iconHash: string
    publishDate: Date
    updateDate: Date
    booRatings: number
    yayRatings: number
    hearts: number
    totalPlays: number
    uniquePlays: number
    publisher: User
    teamPicked: boolean
    gameVersion: number
    score: number
    location: Location
}
