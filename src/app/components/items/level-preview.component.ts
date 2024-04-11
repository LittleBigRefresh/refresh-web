import {Component, Input} from '@angular/core';
import {Level} from "../../api/types/levels/level";
import {UserLinkComponent} from "../ui/links/user-link.component";

@Component({
  selector: 'app-level-preview',
  standalone: true,
  imports: [
    UserLinkComponent
  ],
  template: `
    <div class="group">
      <p class="font-medium text-lg">{{ level.title }}</p>
      <span class="text-gentle italic">
        by <app-user-link [user]="level.publisher"></app-user-link>
      </span>
    </div>
  `,
  styles: ``
})
export class LevelPreviewComponent {
  @Input({required: true}) level!: Level;
}
