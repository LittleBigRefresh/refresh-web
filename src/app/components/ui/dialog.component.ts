import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  template: `
    <dialog #dialog class="backdrop:backdrop-brightness-75 text-foreground bg-api-remove bg-opacity-0 overflow-y-clip" tabindex="-1">
      <ng-content></ng-content>
    </dialog>
  `,
  styles: ``
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.dialog.nativeElement.showModal();
  }

  ngOnDestroy(): void {
    this.dialog.nativeElement.close();
  }
}
