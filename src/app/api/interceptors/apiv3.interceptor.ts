import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {RefreshApiResponse} from "../refresh-api-response";

export class APIv3Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
          .pipe(map(e => this.parseAPIv3Response(e)));
  }

  private parseAPIv3Response(event: HttpEvent<any>): HttpEvent<any> {
    if(event instanceof HttpResponse) {
        const body: RefreshApiResponse<any> = event.body;
        if(body.success) {
          return event.clone({
              body: body.data
          })
        }

        throw new Error(`${body.error!.name}: ${body.error!.name}`);
    }
    return event;
  }
}
