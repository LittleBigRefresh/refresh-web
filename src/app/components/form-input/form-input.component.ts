import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type InputType = 
  'text' |
  'password'

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html'
})
export class FormInputComponent {
  _icon: IconProp = 'poo' // this will get definitely someones attention if this property is left undefined
  _name: string = 'NAME NOT SET, FIX ME'
  _type: InputType = 'text'

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
}
