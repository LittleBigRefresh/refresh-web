import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiTokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!isPlatformBrowser(PLATFORM_ID)) {
            return next.handle(req);
        }

        const storedToken: string | null = localStorage.getItem('game_token')
        if (storedToken) {
            const reqClone = req.clone({
                setHeaders: {
                    'Authorization': storedToken
                }
            });
            return next.handle(reqClone);
        }
        return next.handle(req);
    }
}