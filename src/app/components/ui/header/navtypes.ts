import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {
    faBookOpen,
    faCheckCircle,
    faFire,
    faFireAlt,
    faImages,
    faInfoCircle,
    faPlay,
    faQuestionCircle,
    faRandom,
    faShareAlt,
    faThList,
    faTools,
    faTrophy
} from "@fortawesome/free-solid-svg-icons";

export interface NavCategory {
    name: string
    icon: IconProp
    defaultRoute: string | null
    items: NavItem[];
}

export interface NavItem {
    name: string
    icon: IconProp
    route: string
}

export const navTree: NavCategory[] = [
    {
        name: "Play",
        icon: faPlay,
        defaultRoute: "/levels",
        items: [
            {
                name: "Team Picks",
                icon: faCheckCircle,
                route: "/levels/teamPicks"
            },
            {
                name: "Cool Levels",
                icon: faFire,
                route: "/levels/coolLevels"
            },
            {
                name: "Lucky Dip",
                icon: faRandom,
                route: "/levels/random"
            },
        ]
    },
    {
        name: "Create",
        icon: faTools,
        defaultRoute: "/contests",
        items: [
            {
                name: "Contests",
                icon: faTrophy,
                route: "/contests"
            },
            {
                name: "Playlists",
                icon: faThList,
                route: "/playlists"
            }
        ]
    },
    {
        name: "Share",
        icon: faShareAlt,
        defaultRoute: "/activity",
        items: [
            {
                name: "Recent Activity",
                icon: faFireAlt,
                route: "/activity"
            },
            {
                name: "Photos",
                icon: faImages,
                route: "/photos"
            }
        ]
    }
]

export const rightNavTree: NavCategory[] = [
    {
        name: "Other",
        icon: faQuestionCircle,
        defaultRoute: null,
        items: [
            {
                name: "API Documentation",
                icon: faBookOpen,
                route: "/docs"
            },
            {
                name: "About Us",
                icon: faInfoCircle,
                route: "/instance"
            },
        ]
    }
]