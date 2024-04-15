import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TitleService} from "../../services/title.service";
import {NgIf} from "@angular/common";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent
  ],
  template: `
    <h1 class="font-bold text-3xl mb-2.5" *ngIf="title">
      <fa-icon *ngIf=icon [icon]=icon></fa-icon>
      {{title}}
    </h1>
  `
})
export class PageTitleComponent implements OnInit{
  @Input() title: string | undefined;
  @Input() icon: IconProp | undefined;

  constructor(private router: Router, private titleService: TitleService) {}

  ngOnInit(): void {
    if(this.title == undefined) {
      this.title = this.titleService.getCurrentPageTitle(this.router)
    }
  }
}
