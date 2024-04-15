import { Routes } from '@angular/router';

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
    // KEEP THIS ROUTE LAST! It handles pages that do not exist.
    {
        path: '**',
        loadComponent: () => import('./pages/404/404.component').then(x => x.NotFoundComponent),
        data: {title: "404 Not Found"}
    }
];
