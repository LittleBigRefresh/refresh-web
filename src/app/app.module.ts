import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelComponent } from './components/level/level.component';
import { LevelCategoriesComponent } from './pages/level-categories/level-categories.component';
import { LevelListingComponent } from './pages/level-listing/level-listing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './pages/main/main.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// ICONS //
import { faWarning } from '@fortawesome/free-solid-svg-icons';
// END ICONS //

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    LevelCategoriesComponent,
    LevelListingComponent,
    NotFoundComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faWarning)
  }
}
