import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input, isDevMode,
  Output,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import {defaultPageSize} from "../../api/client.service";
import {RefreshApiListInfo} from "../../api/refresh-api-list-info";

const debug: boolean = isDevMode() && false;

@Component({
    selector: 'app-infinite-scroller',
    imports: [],
    template: `
    @if (debug) {
      <div>
        <p>next page index: {{this.nextPageIndex}}</p>
        <p>total: {{this.total}}</p>
        <p>loading: {{this.isLoading}} (total loads: {{this.totalLoads}})</p>
      </div>
    }
    `
})
export class InfiniteScrollerComponent implements AfterViewInit {
  protected readonly isBrowser: boolean;

  constructor(private element: ElementRef, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @Input() root!: HTMLElement;
  @Output() loadData = new EventEmitter;

  @Input() pageSize: number = defaultPageSize;
  @Input({required: true}) isLoading: boolean = false;

  nextPageIndex: number = this.pageSize + 1;
  total: number = 0;
  totalLoads: number = 0;

  @Input({required: true}) set listInfo(listInfo: RefreshApiListInfo) {
    if(!listInfo) return;
    this.nextPageIndex = listInfo.nextPageIndex;
    this.total = listInfo.totalItems;
  }

  triggerLoad(): void {
    if(this.isLoading) return;
    if(this.totalLoads > 0 && this.nextPageIndex < 1) return;

    this.loadData.emit(); // tell the parent to load more data
    this.totalLoads++;
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // Don't allow SSR to subscribe to infinite scrollers

    const element: HTMLElement = this.element.nativeElement;
    const config: IntersectionObserverInit = {
      root: this.root,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if(entries.length < 1 || !entries[0].isIntersecting) return;
      this.triggerLoad();
    }, config)

    observer.observe(element);
  }

  protected readonly debug: boolean = debug;
}
