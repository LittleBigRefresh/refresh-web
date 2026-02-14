import {Route, Routes} from '@angular/router';
import {appendDebugRoutes} from "./debug/debug.routes";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landing/landing.component').then(x => x.LandingComponent),
        data: {title: "Home"}
    },
    {
        path: 'levels',
        loadComponent: () => import('./pages/categories/level-categories.component').then(x => x.LevelCategoriesComponent),
        data: {title: "Level Categories"}
    },
    {
        path: 'levels/:category',
        loadComponent: () => import('./pages/level-listing/level-listing.component').then(x => x.LevelListingComponent),
        data: {title: "Level Listing"}
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
        path: 'level/:id/:slug/edit',
        loadComponent: () => import('./pages/level-edit/level-edit.component').then(x => x.LevelEditComponent),
        data: {title: "Edit Level"},
    },
    ...alias("level/:id/:slug/edit", "slot/:id/:slug/edit"),
    {
        path: 'photos',
        loadComponent: () => import('./pages/photo-listing/photo-listing.component').then(x => x.PhotoListingComponent),
        data: {title: "Photos"},
    },
    {
        path: 'photos',
        loadComponent: () => import('./pages/photo-listing/photo-listing.component').then(x => x.PhotoListingComponent),
        data: {title: "Photos"},
    },
    {
        path: 'photo/:id',
        loadComponent: () => import('./pages/photo/photo-page.component').then(x => x.PhotoPageComponent),
        data: {title: "Photo"},
    },
    {
        path: 'activity',
        loadComponent: () => import('./pages/activity-listing/activity-listing.component').then(x => x.ActivityListingComponent),
        data: {title: "Recent Activity"},
    },
    {
        path: 'rooms',
        loadComponent: () => import('./pages/room-listing/room-listing.component').then(x => x.RoomListingComponent),
        data: {title: "Room Listing"},
    },
    {
        path: 'user/:username',
        loadComponent: () => import('./pages/user/user.component').then(x => x.UserComponent),
        data: {title: "User Page"},
    },
    {
        path: 'users',
        loadComponent: () => import('./pages/categories/user-categories-component').then(x => x.UserCategoriesComponent),
        data: {title: "User Categories"},
    },
    {
        path: 'users/:category',
        loadComponent: () => import('./pages/user-listing/user-listing.component').then(x => x.UserListingComponent),
        data: {title: "User Listing"},
    },
    {
        path: 'u/:uuid',
        loadComponent: () => import('./pages/user/user.component').then(x => x.UserComponent),
        data: {title: "User Page"},
    },
    {
        path: 'settings/profile',
        loadComponent: () => import('./pages/user-settings/profile/user-profile-settings.component').then(x => x.UserProfileSettingsComponent),
        data: {title: "Profile Settings"},
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(x => x.LoginComponent),
        data: {title: "Sign in"},
    },
    {
        path: 'logout',
        loadComponent: () => import('./pages/auth/logout/logout.component').then(x => x.LogoutComponent),
        data: {title: "Sign Out"},
    },
    {
        path: 'contests',
        loadComponent: () => import('./pages/contest-listing/contest-listing.component').then(x => x.ContestListingComponent),
        data: {title: "Contests"},
    },
    {
        path: 'instance',
        loadComponent: () => import('./pages/instance-info/instance-info.component').then(x => x.InstanceInfoComponent),
        data: {title: "About Us"},
    },
    ...appendDebugRoutes(),
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
