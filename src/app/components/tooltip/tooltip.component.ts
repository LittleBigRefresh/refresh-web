import {Component, Input} from '@angular/core';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
    _text: string = "";

    @Input()
    set text(text: string) {
        this._text = text;
    }
}
