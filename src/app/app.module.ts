import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import {
  faBell,
  faCalendar,
  faHeart,
  faMagnifyingGlass,
  faUser,
  faWarning,
  faKey,
  faPoo,
  faXmark,
  faCheckCircle,
  faRightFromBracket,
  faCircleExclamation,
  faShuffle,
  faThumbsUp,
  faThumbsDown,
  faPlay, faCertificate,
} from '@fortawesome/free-solid-svg-icons';

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
import { BannerComponent } from './components/notification/banner.component';
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
import { PhotoListingComponent } from './pages/photo-listing/photo-listing.component';
import { PhotoPageComponent } from './pages/photo-page/photo-page.component';
import { UserLinkComponent } from './components/links/user-link/user-link.component';
import { LevelLinkComponent } from './components/links/level-link/level-link.component';
import { PhotoComponent } from './components/photo/photo.component';
import { NotificationListingComponent } from './pages/notification-listing/notification-listing.component';
import { RefreshNotificationComponent } from './components/refresh-notification/refresh-notification.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { LevelPreviewComponent } from './components/level-preview/level-preview.component';
import {NgxMasonryModule} from "ngx-masonry";
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { LevelAvatarComponent } from './components/level-avatar/level-avatar.component';
import {NgOptimizedImage} from "@angular/common";
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { ActivityComponent } from './pages/activity/activity.component';
import { ActivityEventComponent } from './components/activity-event/activity-event.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminLevelComponent } from './pages/admin-level/admin-level.component';
import { VerifyComponent } from './pages/verify/verify.component';

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
    BannerComponent,
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
    PhotoListingComponent,
    PhotoPageComponent,
    UserLinkComponent,
    LevelLinkComponent,
    PhotoComponent,
    NotificationListingComponent,
    RefreshNotificationComponent,
    DocumentationComponent,
    LevelPreviewComponent,
    UserAvatarComponent,
    LevelAvatarComponent,
    IntersectionObserverDirective,
    ActivityComponent,
    ActivityEventComponent,
    AuthenticationComponent,
    FormCheckboxComponent,
    RegisterComponent,
    AdminPanelComponent,
    AnnouncementComponent,
    AdminUserComponent,
    AdminLevelComponent,
    VerifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    NgxMasonryModule,
    NgOptimizedImage,
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
    library.addIcons(faThumbsUp)
    library.addIcons(faThumbsDown)
    library.addIcons(faPlay)
    library.addIcons(faCertificate)
  }
}
