import {Injectable} from "@angular/core";
import {Meta} from "@angular/platform-browser";
import {User} from "../api/types/user";
import {Instance} from "../api/types/instance";
import {GetAssetImageLink} from "../api/api-client";
import {Photo} from "../api/types/photo";

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

    private embed(title: string, description: string) {
        this.setPropertyTag("og:title", title)
        this.setPropertyTag("og:description", description)
        this.setNamedTag("description", description)
        this.setNamedTag("theme-color", "#2A1936")
    }

    embedUser(user: User) {
        this.embed(user.username + "'s profile", user.description.length == 0 ? 'This person hasn\'t introduced themselves yet.' : user.description);

        this.setNamedTag("og:image", GetAssetImageLink(user.iconHash));
        this.setPropertyTag("og:type", "profile");
        this.setPropertyTag("profile:username", user.username);
    }

    embedInstance(instance: Instance) {
        this.embed(instance.instanceName, instance.instanceDescription);
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
