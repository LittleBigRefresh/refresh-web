import { Level } from "./level"
import { User } from "./user"

export interface Score {
    ScoreId: string
    Score: number
    ScoreType: number
    ScoreSubmitted: Date

    Level: Level
    Players: User[]
    
    Rank: number | undefined
}