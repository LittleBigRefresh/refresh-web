import {MarkedOptions, MarkedRenderer} from "ngx-markdown";

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.heading = (text, level) => {
        let tailwindFontSize: string;

        switch (level) {
            case 1:
                tailwindFontSize = "3xl"
                break;
            case 2:
                tailwindFontSize = "2xl"
                break;
            case 3:
                tailwindFontSize = "xl"
                break;
            default:
                tailwindFontSize = "1xl";
                break;
        }

        return `<h${level} class="font-bold text-${tailwindFontSize}">${text}</h${level}>`;
    }

    renderer.link = (href, title) => {
        return `<a href="${href}" class="text-secondary-bright hover:underline">${title ?? href}</a>`;
    }

    return {
        renderer: renderer,
        gfm: true,
        breaks: false,
        pedantic: false,
    };
}
