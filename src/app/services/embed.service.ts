import {Instance} from "../api/types/instance";
import {Level} from "../api/types/levels/level";
import {Meta} from "@angular/platform-browser";
import {Injectable} from "@angular/core";
import {User} from "../api/types/users/user";
import {ClientService} from "../api/client.service";
import {Photo} from "../api/types/photos/photo";
import {getImageLink} from "../api/data-fetching";

@Injectable({providedIn: 'root'})
export class EmbedService {
    constructor(private meta: Meta, client: ClientService) {
        client.getInstance().subscribe(data => {
            this.embedInstance(data);
        });

        this.setNamedTag("theme-color", "#2A1936");
        this.setPropertyTag("og:type", "website");
    }

    private setPropertyTag(property: string, content: string) {
        this.meta.removeTag(`property="${property}"`);

        if(content.length === 0) return;
        this.meta.addTag({property: property, content: content});
    }

    private setNamedTag(name: string, content: string) {
        this.meta.removeTag(`name="${name}"`);

        if(content.length === 0) return;
        this.meta.addTag({name: name, content: content});
    }

    public setTitle(title: string) {
        this.setPropertyTag("og:title", title)
    }

    public embed(title: string, description: string) {
        this.setTitle(title)
        this.setPropertyTag("og:description", description)
        this.setNamedTag("description", description)
    }

    embedUser(user: User) {
        const description: string = user.description.length == 0 ? "This person hasn't introduced themselves yet." : user.description;
        this.embed(`${user.username}'s profile`, description);

        // this.setNamedTag("og:image", GetAssetImageLink(user.iconHash));
        this.setPropertyTag("og:type", "profile");
        this.setPropertyTag("profile:username", user.username);
    }

    embedLevel(level: Level) {
        const description: string = level.description.length == 0 ? "No description was provided for this level." : level.description;
        const title: string = level.title.length == 0 ? "Unnamed Level" : level.title;

        this.embed(title, description);
        this.setNamedTag("og:image", getImageLink(level.iconHash));
    }

    embedInstance(instance: Instance) {
        if (this.meta.getTag('name="og:title"')) return;

        this.embed(`${instance.instanceName} · ${instance.instanceDescription}`, `${instance.instanceName} is a free custom server for LittleBigPlanet.`);
    }

    embedPhoto(photo: Photo) {
        let title = `Photo by ${photo.publisher.username}`;

        const subjects = photo.subjects.filter(s => s.user?.userId !== photo.publisher.userId);
        if(subjects.length > 0) {
            title += ` and ${subjects.length} other${subjects.length == 1 ? '' : 's'}`;
        }

        if(photo.level != null) {
            title = title.replace("Photo by ", "");
            title += ` in ${photo.level.title}`
        }

        this.embed(title, subjects.map(s => s.displayName).join(", "));
        this.setPropertyTag("og:type", "photo");
        this.setNamedTag("twitter:card", "summary_large_image");
        this.setNamedTag("twitter:image", getImageLink(photo.largeHash));
    }
}
