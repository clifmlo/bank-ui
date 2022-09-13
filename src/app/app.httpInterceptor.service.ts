import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
            console.log("request intercepted");
            console.log(this.authenticationService.username);
            console.log(this.authenticationService.password);
            
//            var s1 = window.btoa(this.authenticationService.username + ":" + this.authenticationService.password);
            
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}