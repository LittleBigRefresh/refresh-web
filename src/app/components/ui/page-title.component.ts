import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TitleService} from "../../services/title.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <h1 class="font-bold text-3xl mb-2.5" *ngIf="title">
      {{title}}
    </h1>
  `
})
export class PageTitleComponent implements OnInit{
  @Input() title: string | undefined;

  constructor(private router: Router, private titleService: TitleService) {}

  ngOnInit(): void {
    if(this.title == undefined) {
      this.title = this.titleService.getCurrentPageTitle(this.router)
    }
  }
}
