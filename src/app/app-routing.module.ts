import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelCategoriesComponent } from './pages/level-categories/level-categories.component';

const routes: Routes = [
  {path: "levels", component: LevelCategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
