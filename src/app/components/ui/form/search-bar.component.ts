import {Component, Input} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {TextboxComponent} from "./textbox.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    TextboxComponent
  ],
  template: `
    <app-textbox [form]="form" ctrlName="query" [icon]="faSearch" placeholder="Search..."></app-textbox>
  `
})
export class SearchBarComponent {
  @Input({required: true}) form: FormGroup = null!;
  protected readonly faSearch = faSearch;
}
