import {RequestStatistics} from "./request-statistics";

export interface Statistics {
    totalLevels: number
    totalUsers: number
    activeUsers: number
    totalPhotos: number
    totalEvents: number
    currentRoomCount: number
    currentIngamePlayersCount: number

    requestStatistics: RequestStatistics
}
