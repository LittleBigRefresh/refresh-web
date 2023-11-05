import {IconDefinition} from "@fortawesome/fontawesome-svg-core"

export class HeaderLink {
    title: string
    link: string
    icon: IconDefinition

    constructor(title: string, link: string, icon: IconDefinition) {
        this.title = title;
        this.link = link;
        this.icon = icon;
    }
}
