import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {applyShims} from "./helpers/server-shims";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
  ]
};

applyShims();

export const config = mergeApplicationConfig(appConfig, serverConfig);
