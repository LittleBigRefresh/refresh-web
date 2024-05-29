import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  template: `
    <dialog #dialog class="backdrop-brightness-50 text-foreground bg-opacity-0">
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
