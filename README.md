# `main` is a WIP non-production-ready rewrite!

This branch hosts progress for the complete rewrite of refresh-web.

For a feature-complete version that comes at the cost of being in feature-lock, use the `legacy` branch instead.
This is the same version as the one deployed on https://lbp.littlebigrefresh.com and the one included with Refresh itself.

Eventually, this rewrite will replace `legacy` entirely.

# Refresh Web

This is the primary frontend for [Refresh](https://github.com/LittleBigRefresh/Refresh).

![A look at the front page](https://github.com/LittleBigRefresh/refresh-web/assets/40577357/440a45f1-08c5-4a61-b8dd-0a312e059d72)

Suggestions and criticism regarding design and general layout are welcome!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).
You can set up an Angular environment using [this guide](https://angular.io/guide/setup-local).

## Development server

Run `ng serve` in a terminal for a development server that listens at `http://localhost:4200/`.
The page will automatically refresh itself when source code is changed.

Make sure you are also running Refresh *(or any other server compatible with Refresh's APIv3)* at `http://localhost:10061` or else the website will not function.
You can also point the `environment.development.ts` to use the official production server.
