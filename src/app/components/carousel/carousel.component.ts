import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {faChevronCircleLeft, faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild("items") itemsHolder: ElementRef = null!;
  carouselItems: HTMLElement[] = [];

  currentIndex: number = 0;
  @Input("maxItems") maxItems: number = 3;

  ngAfterViewInit(): void {
    this.carouselItems = Array.from<HTMLElement>(this.itemsHolder.nativeElement.children);
    this.updateCarousel()
  }

  updateCarousel(): void {
    const i: number = this.currentIndex;

    for (let carouselItem of this.carouselItems) {
      carouselItem.hidden = true;
    }

    for (let carouselItem of this.carouselItems.slice(i, i + this.maxItems)) {
      carouselItem.hidden = false;
    }
  }

  private clampIndex(value: number): number {
    const min: number = 0;
    const max: number = this.carouselItems.length - Math.min(this.maxItems, this.carouselItems.length);

    return Math.min(Math.max(value, min), max);
  }

  increment(): void {
    this.currentIndex = this.clampIndex(this.currentIndex + 1);
    this.updateCarousel();
  }

  decrement(): void {
    this.currentIndex = this.clampIndex(this.currentIndex - 1);
    this.updateCarousel();
  }

  protected readonly faChevronCircleLeft = faChevronCircleLeft;
  protected readonly faChevronCircleRight = faChevronCircleRight;
}
