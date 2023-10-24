import {Injectable} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {User} from "../api/types/user";
import {Instance} from "../api/types/instance";
import {GetAssetImageLink} from "../api/api-client.service";
import {Photo} from "../api/types/photo";
import {Level} from "../api/types/level";

@Injectable({providedIn: 'root'})
export class EmbedService {
    constructor(private meta: Meta) {}

    private setPropertyTag(property: string, content: string) {
        this.meta.removeTag(`property="${property}"`);
        this.meta.addTag({ property: property, content: content });
    }

    private setNamedTag(name: string, content: string) {
        this.meta.removeTag(`name="${name}"`);
        this.meta.addTag({ name: name, content: content });
    }

    public embed(title: string, description: string) {
        this.setPropertyTag("og:title", title)
        this.setPropertyTag("og:description", description)
        this.setNamedTag("description", description)
        this.setNamedTag("theme-color", "#A13DE3")
    }

    embedUser(user: User) {
        const description: string = user.description.length == 0 ? "This person hasn't introduced themselves yet." : user.description;
        this.embed(`${user.username}'s profile`, description);

        this.setNamedTag("og:image", GetAssetImageLink(user.iconHash));
        this.setPropertyTag("og:type", "profile");
        this.setPropertyTag("profile:username", user.username);
    }

    embedLevel(level: Level) {
      const description: string = level.description.length == 0 ? "No description was provided for this level." : level.description;
      const title: string = level.title.length == 0 ? "Unnamed Level" : level.title;

      this.embed(title, description);
      this.setNamedTag("og:image", GetAssetImageLink(level.iconHash));
    }

    embedInstance(instance: Instance) {
        if(this.meta.getTag('name="og:title"')) return;

        this.embed(`${instance.instanceName} - ${instance.instanceDescription}`, `${instance.instanceName} is a free custom server for LittleBigPlanet.`);
        this.setPropertyTag("og:type", "website");
    }

    embedPhoto(photo: Photo) {
        let subjects: string[] = [];
        for(let subject of photo.subjects) {
            subjects.push(subject.displayName);
        }

        this.embed(subjects.join(", "), "A photo taken from LittleBigPlanet.");
        this.setPropertyTag("og:type", "photo");
        this.setNamedTag("twitter:card", "summary_large_image");
        this.setNamedTag("twitter:image", GetAssetImageLink(photo.largeHash));
    }
}
