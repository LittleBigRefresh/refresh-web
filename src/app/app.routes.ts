import {Route, Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing/landing.component').then(x => x.LandingComponent),
        data: {title: "Home"}
    },
    {
        path: 'levels',
        loadComponent: () => import('./pages/categories/categories.component').then(x => x.CategoriesComponent),
        data: {title: "Level Categories"}
    },
    {
        path: 'levels/:category',
        loadComponent: () => import('./pages/level-listing/level-listing.component').then(x => x.LevelListingComponent),
        data: {title: "Category"}
    },
    {
        path: 'level/:id/:slug',
        loadComponent: () => import('./pages/level/level.component').then(x => x.LevelComponent),
        data: {title: "Unnamed Level"},
    },
    {
        path: 'level/:id',
        loadComponent: () => import('./pages/level/level.component').then(x => x.LevelComponent),
        data: {title: "Unnamed Level"},
    },
    ...alias("level/:id/:slug", "slot/:id/:slug"),
    ...alias("level/:id", "slot/:id",),
    {
        path: 'photos',
        loadComponent: () => import('./pages/photo-listing/photo-listing.component').then(x => x.PhotoListingComponent),
        data: {title: "Photos"},
    },
    // KEEP THIS ROUTE LAST! It handles pages that do not exist.
    {
        path: '**',
        loadComponent: () => import('./pages/404/404.component').then(x => x.NotFoundComponent),
        data: {title: "404 Not Found"}
    }
];

function alias(route: string, ...names: string[]): Route[] {
    let routes: Route[] = [];
    for (let name of names) {
        routes.push({
            path: name,
            redirectTo: route,
        });
    }

    return routes;
}
