import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelComponent } from './components/level/level.component';
import { LevelCategoriesComponent } from './pages/level-categories/level-categories.component';
import { LevelListingComponent } from './pages/level-listing/level-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    LevelCategoriesComponent,
    LevelListingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
