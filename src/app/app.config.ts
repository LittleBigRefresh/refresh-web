import {ApplicationConfig, Provider, Type} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {ApiBaseInterceptor} from "./api/interceptors/api-base.interceptor";
import {APIv3Interceptor} from "./api/interceptors/apiv3.interceptor";
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    useInterceptor(ApiBaseInterceptor),
    useInterceptor(APIv3Interceptor),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if(config.src.startsWith("/")) return config.src;

        // Only consider SHA1 asset hashes
        // Naturally filters out GUIDs, and blank hashes.
        if(config.src.length != 40) return "/assets/missingLevel.svg";

        return `https://lbp.littlebigrefresh.com/api/v3/assets/${config.src}/image`
      }
    }
  ]
};

function useInterceptor(interceptor: Type<any>): Provider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: interceptor,
    multi: true,
  }
}
