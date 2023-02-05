import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelComponent } from './components/level/level.component';
import { LevelCategoriesComponent } from './pages/level-categories/level-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    LevelCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
