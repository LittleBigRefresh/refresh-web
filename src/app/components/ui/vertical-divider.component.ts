import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-vertical-divider',
    imports: [],
    template: `<div [class]="'mx-1.5 w-[3px] rounded-full h-11 ' + color"></div>`
})

export class VerticalDividerComponent {
    @Input() color: String = "bg-divider";
}