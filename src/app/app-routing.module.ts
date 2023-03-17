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

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "levels", component: LevelCategoriesComponent },
  { path: "levels/:route", component: LevelListingComponent },
  { path: "level/:id", component: LevelComponent },
  { path: "user/:uuid", component: UserComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "404", component: NotFoundComponent },
];

if(isDevMode()) {
  routes.push({ path: "debug/ui", component: UiDebugComponent });
}

// 404 handling
routes.push({ path: "**", component: NotFoundComponent });

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
