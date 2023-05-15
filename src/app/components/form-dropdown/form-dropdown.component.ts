import { Component, Input, isDevMode } from '@angular/core';

@Component({
  selector: 'form-dropdown',
  templateUrl: './form-dropdown.component.html'
})
export class FormDropdownComponent {
  _name: string = 'NAME NOT SET, FIX ME';
  _id: string | undefined = undefined;
  _readonly: boolean = false;
  _options: DropdownOption[] = [];

  isDev: boolean = false;

  constructor() {
    this.isDev = isDevMode();
  }

  @Input()
  set name(param: string) {
    this._name = param;
  }

  @Input()
  set id(param: string) {
    this._id = param;
  }

  @Input()
  set readonly(param: boolean) {
    this._readonly = param;
  }

  @Input()
  set options(options: DropdownOption[]) {
    this._options = options;
  }
}

export interface DropdownOption {
  Value: string
  Name: string
}