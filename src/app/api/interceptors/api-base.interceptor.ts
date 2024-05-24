import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getApiBaseUrl} from "../../helpers/data-fetching";

export class ApiBaseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({
        url: getApiBaseUrl() + req.url,
      });

      return next.handle(req);
    }
}
