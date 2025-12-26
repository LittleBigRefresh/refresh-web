import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ClientService } from '../../api/client.service';
import { Instance } from '../../api/types/instance';
import { BannerService } from '../../banners/banner.service';
import { RefreshApiError } from '../../api/refresh-api-error';
import { LayoutService } from '../../services/layout.service';
import { VerticalDividerComponent } from "./vertical-divider.component";
import { faCodeFork, faEnvelope, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { DividerComponent } from "./divider.component";
import { getWebsiteRepoUrl } from '../../helpers/data-fetching';

@Component({
  selector: 'app-footer',
  imports: [
    VerticalDividerComponent,
    DividerComponent,
    NgTemplateOutlet,
    FaIconComponent
],
  template: `
    <footer class="mt-10 mb-5 mx-4">
      @if (instance != null) {
        <ng-template #instanceInfo>
          <div class="flex flex-col gap-y-1">
            <div class="flex flex-row gap-x-1">
              <!-- TODO: Show instance icon downloaded from given URL -->
              <p class="text-3xl">{{ instance.instanceName }}</p>
            </div>
            <p class="text-wrap"> {{instance.instanceDescription}} </p>
          </div>
        </ng-template>

        <ng-template #contactInfo>
          <div class="flex flex-col gap-y-1 w-max">
            <p class="text-3xl">Contact Us</p>
            <a [href]="'mailto:' + instance.contactInfo.emailAddress" class="text-secondary-bright hover:underline">
              <fa-icon class="pr-1" [icon]="faEnvelope"></fa-icon>
              Email Us
            </a>
            <a [href]="instance.contactInfo.discordServerInvite" class="text-secondary-bright hover:underline">
              <fa-icon class="pr-1" [icon]="faSignIn"></fa-icon>
              Join Our Discord Server
            </a>
          </div>
        </ng-template>

        <ng-template #softwareInfo>
          <div class="flex flex-col gap-y-1 w-max">
            <p class="text-3xl">The Software</p>
            <a [href]="websiteRepoUrl" class="text-secondary-bright hover:underline">
              <fa-icon class="pr-1" [icon]="faCodeFork"></fa-icon>
              Website Repository
            </a>
            <a [href]="instance.softwareSourceUrl" class="text-secondary-bright hover:underline">
              <fa-icon class="pr-1" [icon]="faCodeFork"></fa-icon>
              Server Repository
            </a>
          </div>
        </ng-template>

        @if (isMobile) {
          <div class="flex flex-col gap-y-1">
            <ng-container *ngTemplateOutlet="instanceInfo"></ng-container>
            <app-divider color="bg-foreground"></app-divider>
            <ng-container *ngTemplateOutlet="contactInfo"></ng-container>
            <app-divider color="bg-foreground"></app-divider>
            <ng-container *ngTemplateOutlet="softwareInfo"></ng-container>
          </div>
        }
        @else {
          <div class="flex flex-row justify-center">
            <div class="flex flex-row flex-grow gap-x-3 justify-evenly max-w-350">
              <div class="mb-20">
                <ng-container *ngTemplateOutlet="instanceInfo"></ng-container>
              </div>
              <app-vertical-divider color="bg-foreground" height="h-full"></app-vertical-divider>
              <div class="mb-20">
                <ng-container *ngTemplateOutlet="contactInfo"></ng-container>
              </div>
              <app-vertical-divider color="bg-foreground" height="h-full"></app-vertical-divider>
              <div class="mb-20">
                <ng-container *ngTemplateOutlet="softwareInfo"></ng-container>
              </div>
            </div>
          </div>
        }
      }
      @else {
        <div class="flex flex-col">
          <p class="text-3xl">Failed to retrieve instance data</p>
          <p>{{ instanceError ?? "" }}</p>
        </div>
      }
    </footer>
  `
})
export class FooterComponent {
  protected instance: Instance | undefined;
  protected instanceError: String | undefined;

  protected isMobile: boolean = false;
  protected websiteRepoUrl: String = getWebsiteRepoUrl();
  
  constructor(private client: ClientService, protected banner: BannerService, protected layout: LayoutService) {
    this.layout.isMobile.subscribe(v => this.isMobile = v);

    client.getInstance().subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.instanceError = apiError == null ? error.message : apiError.message;
      },
      next: response => {
        this.instance = response;
      }
    });
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly faSignIn = faSignIn;
  protected readonly faCodeFork = faCodeFork;
}
