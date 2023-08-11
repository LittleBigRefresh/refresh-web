import { Component, Input, isDevMode } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type InputType =
  'text' |
  'password' |
  'dropdown' |
  'datetime-local' |
  'email'

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html'
})
export class FormInputComponent {
  _icon: IconProp = 'poo'; // this will get definitely someone's attention if this property is left undefined
  _name: string = 'NAME NOT SET, FIX ME';
  _type: InputType = 'text';
  _id: string | undefined = undefined;
  _readonly: boolean = false;
  _value: string = "";
  _showLabel: boolean = true;

  isDev: boolean = false;

  constructor() {
    this.isDev = isDevMode();
  }

  @Input()
  set icon(param: IconProp) {
    this._icon = param;
  }

  @Input()
  set name(param: string) {
    this._name = param;
  }

  @Input()
  set type(param: InputType) {
    this._type = param;
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
  set value(param: string | undefined) {
    if(param === undefined) param = "";
    this._value = param;
  }

  @Input()
  set showLabel(param: boolean) {
    this._showLabel = param;
  }
}
