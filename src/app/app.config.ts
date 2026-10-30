import {ApplicationConfig, Provider, Type} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import {ApiBaseInterceptor} from "./api/interceptors/api-base.interceptor";
import {APIv3Interceptor} from "./api/interceptors/apiv3.interceptor";
import {IMAGE_LOADER} from "@angular/common";
import {loadImage} from "./helpers/data-fetching";
import {ApiTokenInterceptor} from "./api/interceptors/api-token.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withNoIncrementalHydration()),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    useInterceptor(ApiBaseInterceptor),
    useInterceptor(APIv3Interceptor),
    useInterceptor(ApiTokenInterceptor),
    {
      provide: IMAGE_LOADER,
      useValue: loadImage,
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
