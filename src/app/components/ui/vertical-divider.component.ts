import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-vertical-divider',
    imports: [],
    template: `<div [class]="'mx-1.5 w-[3px] rounded-full ' + height + ' ' + color"></div>`
})

export class VerticalDividerComponent {
    @Input() color: String = "bg-divider";
    @Input() height: String = "h-11"
}