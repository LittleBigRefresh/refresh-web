import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface Notification {
    // Styling
    Color: string
    Icon: IconProp

    // Text
    Title: string
    Text: string
}