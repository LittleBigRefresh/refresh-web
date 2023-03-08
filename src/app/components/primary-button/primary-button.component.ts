import { Component, Input } from '@angular/core';

@Component({
  selector: 'primary-button',
  templateUrl: './primary-button.component.html'
})
export class PrimaryButtonComponent {
  _text: string = "NOT SET, FIX ME"

  @Input()
  set text(param: string) {
    this._text = param;
  }
}
