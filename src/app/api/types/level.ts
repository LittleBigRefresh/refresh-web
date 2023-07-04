import { User } from "./user"

export interface Level {
    levelId: number
    title: string
    description: string
    iconHash: string
    publishDate: number
    updateDate: number

    publisher: User
}
