import {Pipe, PipeTransform} from "@angular/core";
import {Platform} from "../api/types/platform";

@Pipe({
    name: 'platform',
    standalone: true
})
export class PlatformPipe implements PipeTransform {
    transform(value: Platform, short: boolean = false): string {
        switch (value) {
            case Platform.PS3:
                return "PS3";
            case Platform.RPCS3:
                return "RPCS3";
            case Platform.Vita:
                return "PS Vita";
            case Platform.Website:
                return "Website";
            case Platform.PSP:
                return "PSP";
        }
    }
}