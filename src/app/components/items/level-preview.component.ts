import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";

@Component({
  selector: 'app-level-preview',
  standalone: true,
  imports: [],
  template: `
    <p>
      {{ level.title }}
    </p>
  `,
  styles: ``
})
export class LevelPreviewComponent {
  @Input({required: true}) level!: Level;
}
