import {Component, Input, isDevMode} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'form-checkbox',
  templateUrl: './form-checkbox.component.html'
})
export class FormCheckboxComponent {
  _icon: IconProp = 'poo'; // this will get definitely someone's attention if this property is left undefined
  _name: string = 'NAME NOT SET, FIX ME';
  _id: string | undefined = undefined;
  _readonly: boolean = false;
  _value: boolean = false;
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
  set id(param: string) {
    this._id = param;
  }

  @Input()
  set readonly(param: boolean) {
    this._readonly = param;
  }

  @Input()
  set value(param: boolean | undefined) {
    if(param === undefined) param = false;
    this._value = param;
  }

  @Input()
  set showLabel(param: boolean) {
    this._showLabel = param;
  }
}
