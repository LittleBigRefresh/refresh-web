import { Component, Input } from '@angular/core';

@Component({
  selector: 'divider',
  templateUrl: './divider.component.html'
})
export class DividerComponent {
  _brightness: number = 700

  @Input()
  set brightness(brightness: number) {
    this._brightness = brightness;
  }
}
