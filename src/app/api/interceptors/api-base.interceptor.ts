import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

const base: string = "https://lbp.littlebigrefresh.com/api/v3";

export class ApiBaseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({
        url: base + req.url,
      });

      return next.handle(req);
    }
}
