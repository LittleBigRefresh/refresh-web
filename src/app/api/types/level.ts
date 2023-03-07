import { User } from "./user"

export interface Level {
    LevelId: number
    Title: string
    Description: string
    IconHash: string
    PublishDate: number
    UpdateDate: number

    Publisher: User
}