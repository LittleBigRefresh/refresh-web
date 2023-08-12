import { isDevMode, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LevelCategoriesComponent } from './pages/level-categories/level-categories.component';
import { LevelListingComponent } from './pages/level-listing/level-listing.component';
import { LevelComponent } from './pages/level/level.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UiDebugComponent } from './pages/ui-debug/ui-debug.component';
import { UserComponent } from './pages/user/user.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PhotoPageComponent } from './pages/photo-page/photo-page.component';
import { PhotoListingComponent } from "./pages/photo-listing/photo-listing.component";
import {NotificationListingComponent} from "./pages/notification-listing/notification-listing.component";
import {DocumentationComponent} from "./pages/documentation/documentation.component";
import {ActivityComponent} from "./pages/activity/activity.component";
import {AuthenticationComponent} from "./pages/authentication/authentication.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AdminPanelComponent} from "./pages/admin-panel/admin-panel.component";
import {AdminLevelComponent} from "./pages/admin-level/admin-level.component";
import {AdminUserComponent} from "./pages/admin-user/admin-user.component";
import {VerifyComponent} from "./pages/verify/verify.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "levels", component: LevelCategoriesComponent },
  { path: "slots", redirectTo: "levels" },
  { path: "levels/:route", component: LevelListingComponent },
  { path: "level/:id", component: LevelComponent },
  { path: "slot/:id", redirectTo: "level/:id" },
  { path: "user/:username", component: UserComponent },
  { path: "u/:uuid", component: UserComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "settings", component: SettingsComponent },
  { path: "photos", component: PhotoListingComponent },
  { path: "photo/:id", component: PhotoPageComponent },
  { path: "notifications", component: NotificationListingComponent },
  { path: "activity", component: ActivityComponent },
  { path: "docs", redirectTo: "documentation" },
  { path: "documentation", component: DocumentationComponent },
  { path: "auth", redirectTo: "authentication" },
  { path: "authentication", component: AuthenticationComponent },
  { path: "register", component: RegisterComponent },
  { path: "verify", component: VerifyComponent },
  { path: "admin", component: AdminPanelComponent },
  { path: "admin/level/:id", component: AdminLevelComponent },
  { path: "admin/user/:uuid", component: AdminUserComponent },
];

if(isDevMode()) {
  routes.push({ path: "debug/ui", component: UiDebugComponent });
}

// 404 handling
routes.push({ path: "**", component: NotFoundComponent });

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
