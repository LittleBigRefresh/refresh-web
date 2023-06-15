// weird name since JS has a type named Notification
export interface RefreshNotification {
  NotificationId: string
  Title: string
  Text: string

  CreatedAt: Date

  FontAwesomeIcon: string
  ColorCode: string
}
