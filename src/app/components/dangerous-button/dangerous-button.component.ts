import { Component, Input } from '@angular/core';

@Component({
  selector: 'dangerous-button',
  templateUrl: './dangerous-button.component.html',
})
export class DangerousButtonComponent {
  _text: string = "NOT SET, FIX ME"

  @Input()
  set text(param: string) {
    this._text = param;
  }
}
