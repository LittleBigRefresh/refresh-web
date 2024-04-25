import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export type InputType =
    'text' |
    'password' |
    'dropdown' |
    'datetime-local' |
    'email'

@Component({
    selector: 'form-input',
    templateUrl: './form-input.component.html'
})
export class FormInputComponent {
    _icon: IconProp = 'poo'; // this will get definitely someone's attention if this property is left undefined
    _name: string = 'NAME NOT SET, FIX ME';
    _type: InputType = 'text';
    _readonly: boolean = false;

    @Input() value: string | undefined = "";
    _valueDate: Date | undefined = undefined;

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>;
    @Output() valueDateChange: EventEmitter<Date> = new EventEmitter<Date>;

    @Input("multiline") multiline: boolean = false;

    @Input()
    set icon(param: IconProp) {
        this._icon = param;
    }

    @Input()
    set name(param: string) {
        this._name = param;
    }

    @Input()
    set type(param: InputType) {
        this._type = param;
    }

    @Input()
    set readonly(param: boolean) {
        this._readonly = param;
    }

    @Input()
    set valueDate(value: Date | undefined) {
        if(!value) this._valueDate = undefined;
        else this._valueDate = new Date(value);
    }

    onChange(event: any) {
        this.value = event.target.value;
        if (this.value) {
            this.valueChange.emit(this.value);
        }

        this._valueDate = event.target.valueAsDate;
        if(this._valueDate) {
            this.valueDateChange.emit(this._valueDate);
        }
    }
}
