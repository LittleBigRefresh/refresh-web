import {Component, ElementRef, OnDestroy, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-dialog',
    imports: [],
    template: `
    <dialog (close)="close()" #dialog class="backdrop:backdrop-brightness-50 flex flex-row flex-grow text-foreground bg-container-background bg-opacity-0 overflow-y-clip" tabindex="-1">
      <ng-content></ng-content>
    </dialog>
  `,
    styles: ``
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;
  @Output() onDialogClose = new EventEmitter;

  ngOnInit(): void {
    this.dialog.nativeElement.showModal();
  }

  close(): void {
    this.onDialogClose.emit();
  }

  ngOnDestroy(): void {
    this.dialog.nativeElement.close();
  }
}
