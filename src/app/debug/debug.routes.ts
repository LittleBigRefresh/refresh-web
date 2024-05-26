import {Route, Routes} from "@angular/router";
import {isDevMode} from "@angular/core";

const debugRoutes: Routes = [
    {
        path: 'text',
        loadComponent: () => import('./pages/text-playground/text-playground.component').then(x => x.TextPlaygroundComponent),
        data: {title: "Page Title"},
    }
]

export function appendDebugRoutes(): Route[] {
    if(!isDevMode()) return [];
    return [
        {
            path: 'debug',
            children: debugRoutes
        }
    ];
}
