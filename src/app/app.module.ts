import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { faBell, faCalendar, faHeart, faMagnifyingGlass, faUser, faWarning, faKey, faPoo, faXmark, faCheckCircle, faRightFromBracket, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelCategoriesComponent } from './pages/level-categories/level-categories.component';
import { LevelListingComponent } from './pages/level-listing/level-listing.component';
import { LevelComponent } from './pages/level/level.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './pages/main/main.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpanGentleComponent } from './components/span-gentle/span-gentle.component';
import { ParagraphGentleComponent } from './components/p-gentle/p-gentle.component';
import { LoginComponent } from './pages/login/login.component';
import { DividerComponent } from './components/divider/divider.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ApiTokenInterceptor } from './api/api-token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    LevelCategoriesComponent,
    LevelListingComponent,
    NotFoundComponent,
    MainComponent,
    SpanGentleComponent,
    ParagraphGentleComponent,
    LoginComponent,
    DividerComponent,
    FormInputComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    NotificationComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faWarning)
    library.addIcons(faCalendar)
    library.addIcons(faMagnifyingGlass)
    library.addIcons(faHeart)
    library.addIcons(faBell)
    library.addIcons(faUser)
    library.addIcons(faKey)
    library.addIcons(faPoo)
    library.addIcons(faXmark)
    library.addIcons(faCheckCircle)
    library.addIcons(faRightFromBracket)
    library.addIcons(faCircleExclamation)
  }
}
