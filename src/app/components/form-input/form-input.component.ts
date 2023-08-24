import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  _readonly: boolean = false;
  _showLabel: boolean = true;

  @Input() value: string | undefined = "";
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>;

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
  set readonly(param: boolean) {
    this._readonly = param;
  }

  @Input()
  set showLabel(param: boolean) {
    this._showLabel = param;
  }

  onChange(event: any) {
    this.value = event.target.value;
    if(this.value) {
      this.valueChange.emit(this.value);
    }
  }
}
