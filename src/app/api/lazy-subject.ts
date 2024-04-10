// Subscribes to a BehaviourSubject from a source observable, but only fires when an actual value is set.
// Useful for avoiding duplicate, common requests.
import {BehaviorSubject, filter, Observable, take} from "rxjs";

export class LazySubject<TData> {
    private subject: BehaviorSubject<TData> = new BehaviorSubject<TData>(undefined!);
    private madeRequest: boolean = false;
    private observable: () => Observable<TData>;

    constructor(observable: () => Observable<TData>) {
        this.observable = observable
    }

    private consumeObservable() {
        this.observable().subscribe(data => {
            this.subject.next(data);
        })
    }

    public tryLoad(): boolean {
        if (this.madeRequest) return false;

        this.consumeObservable();
        this.madeRequest = true;
        return true;
    }

    asObservable() {
        this.tryLoad();

        return this.subject.asObservable().pipe(
            filter(value => value !== undefined),
            take(1)
        );
    }
}
