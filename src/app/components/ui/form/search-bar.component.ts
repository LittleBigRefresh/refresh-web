import {Component, Input} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {TextboxComponent} from "./textbox.component";
import {FormGroup} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-search-bar',
    imports: [
        TextboxComponent,
        NgClass
    ],
    template: `
    <app-textbox [form]="form" ctrlName="query" [icon]="faSearch" placeholder="Search for levels..." [ngClass]="appClass"></app-textbox>
  `
})
export class SearchBarComponent {
  @Input({required: true}) form: FormGroup = null!;
  @Input() appClass: string = "";

  protected readonly faSearch = faSearch;
}
