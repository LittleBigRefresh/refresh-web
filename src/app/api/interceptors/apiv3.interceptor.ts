import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {RefreshApiResponse} from "../refresh-api-response";
import {ListWithData} from "../list-with-data";

export class APIv3Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(map(e => this.parseAPIv3Response(e)));
    }

    private parseAPIv3Response(event: HttpEvent<any>): HttpEvent<any> {
        if (event instanceof HttpResponse) {
            const body: RefreshApiResponse<any> = event.body;
            if (!body.success) {
                throw new Error(`${body.error!.name}: ${body.error!.name}`);
            }

            // if we have list info, we need to include that data in the response
            if (body.listInfo) {
                const newBody: ListWithData<any> = {
                    data: body.data,
                    listInfo: body.listInfo,
                }

                return event.clone({
                    body: newBody
                })
            }

            return event.clone({
                body: body.data
            })
        }
        return event;
    }
}
