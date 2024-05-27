import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface NavCategory {
    name: string
    icon: IconProp
    defaultRoute: string
    items: NavItem[];
}

export interface NavItem {
    name: string
    icon: IconProp | undefined
    route: string
}
