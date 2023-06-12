import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { faBell, faCalendar, faHeart, faMagnifyingGlass, faUser, faWarning, faKey, faPoo, faXmark, faCheckCircle, faRightFromBracket, faCircleExclamation, faShuffle } from '@fortawesome/free-solid-svg-icons';

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
import { UserComponent } from './pages/user/user.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { DangerousButtonComponent } from './components/dangerous-button/dangerous-button.component';
import { UiDebugComponent } from './pages/ui-debug/ui-debug.component';
import { FormDropdownComponent } from './components/form-dropdown/form-dropdown.component';
import { FormHolderComponent } from './components/form-holder/form-holder.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { LinkComponent } from './components/link/link.component';
import { PageHeaderBlockComponent } from './components/page-header-block/page-header-block.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { UserLinkComponent } from './components/links/user-link/user-link.component';
import { LevelLinkComponent } from './components/links/level-link/level-link.component';

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
    UserComponent,
    LogoutComponent,
    DangerousButtonComponent,
    UiDebugComponent,
    FormDropdownComponent,
    FormHolderComponent,
    PageHeaderComponent,
    LinkComponent,
    PageHeaderBlockComponent,
    SettingsComponent,
    PhotosComponent,
    PhotoComponent,
    UserLinkComponent,
    LevelLinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule,
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
    library.addIcons(faShuffle)
  }
}
