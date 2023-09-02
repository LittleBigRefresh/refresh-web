import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  @Input() root!: HTMLElement;
  @Output() visibilityChange = new EventEmitter<boolean>;

  ngAfterViewInit(): void {
    const element: HTMLElement = this.element.nativeElement;

    const config: IntersectionObserverInit = {
      root: this.root,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      for(let entry of entries) {
        this.visibilityChange.emit(entry.isIntersecting);
      }
    }, config)

    observer.observe(element);
  }
}
