import { Component } from '@angular/core';
import { NgTemplateOutlet, NgOptimizedImage } from '@angular/common';
import { ClientService } from '../../api/client.service';
import { Instance } from '../../api/types/instance';
import { BannerService } from '../../banners/banner.service';
import { RefreshApiError } from '../../api/refresh-api-error';
import { LayoutService } from '../../services/layout.service';
import { VerticalDividerComponent } from "./vertical-divider.component";
import { faArrowUp, faCertificate, faCodeFork, faEnvelope, faPlay, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { DividerComponent } from "./divider.component";
import { getWebsiteRepoUrl } from '../../helpers/data-fetching';
import { Statistics } from '../../api/types/statistics';
import { StatisticComponent } from "./info/statistic.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  imports: [
    VerticalDividerComponent,
    DividerComponent,
    NgTemplateOutlet,
    FaIconComponent,
    NgOptimizedImage,
    StatisticComponent,
    RouterLink
],
  template: `
    <footer class="mt-10 mb-5 mx-4">
      @if (instance != null) {
        <ng-template #instanceInfo>
          <div class="flex flex-col gap-y-1">
            <p class="text-3xl">
              <img [ngSrc]="instance.websiteLogoUrl" class="inline aspect-square object-cover rounded" 
                alt="Server icon" width="30" height="30"
                (error)="iconErr($event.target)" loading="lazy">
              {{ instance.instanceName }}
            </p>
            <p class="text-wrap"> {{instance.instanceDescription}}</p>

            @if (isMobile) {
              <app-divider color="bg-foreground"></app-divider>
            }
            @else {
              <div class="pt-3"></div>
            }
            
            <div>
              @if (statistics != null) {
                <div class="flex flex-col gap-y-1">
                  <p class="text-3xl">Global Statistics</p>
                  <div class="flex flex-wrap gap-x-1.5">
                    <app-statistic [value]=statistics.totalLevels name="Total Levels" [icon]=faCertificate></app-statistic>
                    <app-statistic [value]=statistics.totalUsers name="Total Users" [icon]=faUser></app-statistic>
                    <app-statistic [value]=statistics.totalEvents name="Total Events" [icon]=faPlay></app-statistic>
                    <app-statistic [value]=statistics.requestStatistics.apiRequests name="API Requests" [icon]=faArrowUp></app-statistic>
                  </div>
                </div>
              } 
              @else {
                <div class="flex flex-col">
                  <p class="text-2xl text-wrap">Failed to get statistics</p>
                  <p>{{ statisticsError ?? "Unset error message" }}</p>
                </div>
              }
              <div class="pt-2">
                <a routerLink="/instance" class="text-link hover:text-link-hover hover:underline">
                  More information
                </a>
              </div>
            </div>
          </div>
        </ng-template>

        <ng-template #contactInfo>
          <div class="flex flex-col gap-y-1">
            <p class="text-3xl">Get In Touch</p>
            <a [href]="'mailto:' + instance.contactInfo.emailAddress" class="text-link hover:text-link-hover hover:underline">
              <fa-icon class="pr-1" [icon]="faEnvelope"></fa-icon>
              Email Us <span class="word-wrap-and-break">({{ instance.contactInfo.emailAddress }})</span>
            </a>
            @if (instance.contactInfo.discordServerInvite != null) {
              <a [href]="instance.contactInfo.discordServerInvite" class="text-link hover:text-link-hover hover:underline">
                <fa-icon class="pr-1" [icon]="faSignIn"></fa-icon>
                Join Our Discord Server
              </a>
            }
            @if (instance.contactInfo.adminDiscordUsername != null) {
              <p>
                You can also contact <span class="italic">{{ instance.contactInfo.adminName }}</span> on Discord at <span class="italic">{{ instance.contactInfo.adminDiscordUsername }}</span>
              </p>
            }
            @else {
              <p>
                Server owner: <span class="italic">{{ instance.contactInfo.adminName }}</span>
              </p>
            }
          </div>
        </ng-template>

        <ng-template #softwareInfo>
          <div class="flex flex-col gap-y-1">
            <p class="text-3xl">The Software</p>
            <a [href]="websiteRepoUrl" class="text-link hover:text-link-hover hover:underline">
              <fa-icon class="pr-1" [icon]="faCodeFork"></fa-icon>
              Website Repository
            </a>
            <a [href]="instance.softwareSourceUrl" class="text-link hover:text-link-hover hover:underline">
              <fa-icon class="pr-1" [icon]="faCodeFork"></fa-icon>
              Server Repository
            </a>
            <p class="text-wrap">
              Server license:
              <a [href]="instance.softwareLicenseUrl" class="text-link hover:text-link-hover hover:underline">
                <fa-icon class="pr-1"></fa-icon>
                {{ instance.softwareLicenseName }}
              </a>
            </p>
            <p>
              Server software: <span class="italic">{{instance.softwareName}} ({{instance.softwareType}})</span>
            </p>
            <p>
              Server version: <span class="word-wrap-and-break italic">v{{ instance.softwareVersion }}</span>
            </p>
          </div>
        </ng-template>

        @if (isMobile) {
          <div class="flex flex-col gap-y-1 pb-10">
            <ng-container *ngTemplateOutlet="instanceInfo"></ng-container>
            <app-divider color="bg-foreground"></app-divider>
            <ng-container *ngTemplateOutlet="contactInfo"></ng-container>
            <app-divider color="bg-foreground"></app-divider>
            <ng-container *ngTemplateOutlet="softwareInfo"></ng-container>
          </div>
        }
        @else {
            <div class="flex flex-row flex-grow gap-x-3">
              <div class="w-full mt-5 mb-20">
                <ng-container *ngTemplateOutlet="instanceInfo"></ng-container>
              </div>
              <app-vertical-divider color="bg-foreground" height="h-full"></app-vertical-divider>
              <div class="w-full mt-5 mb-20">
                <ng-container *ngTemplateOutlet="contactInfo"></ng-container>
              </div>
              <app-vertical-divider color="bg-foreground" height="h-full"></app-vertical-divider>
              <div class="w-full mt-5 mb-20">
                <ng-container *ngTemplateOutlet="softwareInfo"></ng-container>
              </div>
            </div>
        }
      }
      @else {
        <div class="flex flex-col">
          <p class="text-2xl">Failed to get instance data for the footer</p>
          <p>{{ instanceError ?? "Unset error message" }}</p>
          <div class="pt-2 flex flex-row justify-center">
            <a routerLink="/instance" class="text-link hover:text-link-hover hover:underline">
              Visit instance data page
            </a>
          </div>
        </div>
      }
    </footer>
  `
})
export class FooterComponent {
  protected instance: Instance | undefined;
  protected instanceError: String | undefined;

  protected statistics: Statistics | undefined;
  protected statisticsError: String | undefined;

  protected isMobile: boolean = false;
  protected websiteRepoUrl: String = getWebsiteRepoUrl();
  protected iconError: boolean = false;
  
  constructor(private client: ClientService, protected banner: BannerService, protected layout: LayoutService) {
    this.layout.isMobile.subscribe(v => this.isMobile = v);

    client.getInstance().subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.instanceError = apiError == null ? error.message : apiError.message;
      },
      next: response => {
        this.instance = response;
        // Only get stats after instance
        client.getStatistics(false).subscribe({
          error: error => {
            const apiError: RefreshApiError | undefined = error.error?.error;
            this.statisticsError = apiError == null ? error.message : apiError.message;
          },
          next: response => {
            this.statistics = response
          }
        });
      }
    });
  }

  iconErr(img: EventTarget | null): void {
    if(this.iconError) return;
    this.iconError = true;

    if(!(img instanceof HTMLImageElement)) return;
    img.srcset = "/assets/logo.svg";
  }

  protected readonly faEnvelope = faEnvelope;
  protected readonly faSignIn = faSignIn;
  protected readonly faCodeFork = faCodeFork;
  protected readonly faCertificate = faCertificate;
  protected readonly faPlay = faPlay;
  protected readonly faUser = faUser;
  protected readonly faArrowUp = faArrowUp;
}
