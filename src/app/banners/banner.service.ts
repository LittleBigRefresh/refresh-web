import {Injectable} from "@angular/core";
import {BannerInfo} from "./banner-info.interface";

@Injectable({providedIn: 'root'})
export class BannerService {
    banners: BannerInfo[] = []

    add(banner: BannerInfo) {
        this.banners.push(banner);
    }

    dismiss(id: number): void {
        this.banners.splice(id, 1);
    }

    success(title: string, text: string) {
        this.add({
            color: 'bg-green',
            icon: 'check-circle',
            text: text,
            title: title,
        })
    }

    warn(title: string, text: string) {
        this.add({
            color: 'bg-yellow',
            icon: 'warning',
            text: text,
            title: title,
        })
    }

    error(title: string, text: string) {
        this.add({
            color: 'dangerous',
            icon: 'exclamation-circle',
            text: text,
            title: title,
        })
    }
}