import { IEnvironment } from "./environment-interface";

export const environment: IEnvironment = {
    production: true,
    apiBaseUrl: window.location.protocol + '//' + window.location.host + "/api/v3"
};
