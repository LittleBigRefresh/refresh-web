import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Score } from '../../api/types/levels/score';
import {UserLinkComponent} from "../ui/text/links/user-link.component";
import {DateComponent} from "../ui/info/date.component";
import {ScoreRouterLinkComponent} from "../ui/text/links/score-router-link.component";
import {DecimalPipe, NgClass} from "@angular/common";
import {AuthenticationService} from "../../api/authentication.service";
import { GamePipe } from '../../pipes/game.pipe';
import { PlatformPipe } from "../../pipes/platform.pipe";
import { User } from '../../api/types/users/user';
import { LayoutService } from '../../services/layout.service';
import { ConfirmationDialogComponent } from "../ui/confirmation-dialog.component";
import { faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from "../ui/form/button.component";
import { ExtendedUser } from '../../api/types/users/extended-user';
import { UserRoles } from '../../api/types/users/user-roles';
import { ClientService } from '../../api/client.service';
import { RefreshApiError } from '../../api/refresh-api-error';
import { BannerService } from '../../banners/banner.service';

@Component({
    selector: 'app-score-preview',
    imports: [
    UserLinkComponent,
    DateComponent,
    ScoreRouterLinkComponent,
    DecimalPipe,
    NgClass,
    GamePipe,
    PlatformPipe,
    ConfirmationDialogComponent,
    ButtonComponent
],
    providers: [
        GamePipe,
        PlatformPipe
    ],
    template: `
    <div class="my-5 px-2.5 flex items-center">
      <app-score-router-link [score]="score" class="text-2xl mr-2 min-w-8">
        <span [ngClass]="rankStyle" class="transition-colors">#{{ score.rank }}</span>
      </app-score-router-link>
      <div class="flex flex-col">
        <div class="flex flex-row justify-between gap-x-2">
          <app-score-router-link class="text-lg" [score]="score">{{ score.score | number }} points</app-score-router-link>
          @if (showDeleteButton) {
            <app-button color="bg-red text-[15px]" yPadding="" [enabled]="enableDeleteButton" [icon]="faTrash" color="bg-red" (click)="toggleDeleteDialog(true)"></app-button>
          }
        </div>
        
        <span class="text-sm">
          Achieved by
          <app-user-link [user]="score.publisher" class="font-bold"></app-user-link>
          <app-date [date]="score.scoreSubmitted" class="ml-2"></app-date>
          in <span class="font-bold">{{ score.game | game: isMobile }}</span>
          on <span class="font-bold">{{ score.platform | platform }}</span>
        </span>
        @if (playersExcludingPublisher.length > 0) {
          <div class="flex flex-row flex-wrap gap-x-1 text-sm text-secondary pb-1">
            starring
            @for(player of playersExcludingPublisher; track player.userId) {
              <app-user-link [user]="player" class="font-bold"></app-user-link>
            }
          </div>
        }
      </div>
    </div>

    @defer (when showDeletePrompt) { @if (showDeletePrompt) {
      <app-confirmation-dialog infoText="Do you really want to DELETE this score?" (closeDialog)="toggleDeleteDialog(false)">
        <app-button text="Spare" [icon]="faSignOutAlt" color="bg-secondary" (click)="toggleDeleteDialog(false)"></app-button>
        <app-button text="Delete!" [icon]="faTrash" color="bg-red" [enabled]="enableDeleteButton" (click)="delete()"></app-button>
      </app-confirmation-dialog>
    }}
  `
})
export class ScorePreviewComponent {
  @Input({required: true}) score: Score = null!;
  @Output() deleted = new EventEmitter;

  protected playersExcludingPublisher: User[] = [];
  
  private ownUser: ExtendedUser | undefined;
  protected isMobile: boolean = false;
  protected showDeletePrompt: boolean = false;
  protected showDeleteButton: boolean = false;
  protected enableDeleteButton: boolean = true;

  constructor(private auth: AuthenticationService, private client: ClientService, protected layout: LayoutService, 
              private banner: BannerService) {
    auth.user.subscribe(user => {
      if (user) {
        this.ownUser = user;
        this.showDeleteButton = user.role >= UserRoles.Moderator;
      }
    });

    this.layout.isMobile.subscribe(v => this.isMobile = v);
  }

  ngOnInit() {
    this.playersExcludingPublisher = [];
    this.score.players.forEach(player => {
      if (player.userId !== this.score.publisher.userId)
        this.playersExcludingPublisher.push(player);
    });
  }

  toggleDeleteDialog(visibility: boolean) {
    this.showDeletePrompt = visibility;
  }

  delete() {
    this.showDeletePrompt = false;
    this.enableDeleteButton = false;
    this.client.deleteScoreAsAdmin(this.score.scoreId).subscribe({
      error: error => {
        const apiError: RefreshApiError | undefined = error.error?.error;
        this.banner.error("Score deletion failed", apiError == null ? error.message : apiError.message);
        this.enableDeleteButton = true;
      },
      next: _ => {
        this.banner.success("Score successfully deleted!", "It is gone forever, but now the user's second best score will show up as high-score.");
        this.deleted.emit();
      }
    })
  }
  
  get rankStyle(): string {
    switch (this.score.rank) {
      case 1:
        return "text-rank-gold font-bold";
      case 2:
        return "text-rank-silver font-bold";
      case 3:
        return "text-rank-bronze font-bold";
      default:
        if(this.ownUser != null && this.score.players[0].userId == this.ownUser?.userId)
          return "text-rank-own font-medium";
        return "text-rank-other";
    }
  }

  protected readonly faTrash = faTrash;
  protected readonly faSignOutAlt = faSignOutAlt;
}
