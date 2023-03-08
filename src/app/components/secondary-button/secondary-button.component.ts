import { Component, Input } from '@angular/core';

@Component({
  selector: 'secondary-button',
  templateUrl: './secondary-button.component.html'
})
export class SecondaryButtonComponent {
  _text: string = "NOT SET, FIX ME"

  @Input()
  set text(param: string) {
    this._text = param;
  }
}
