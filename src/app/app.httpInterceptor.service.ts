import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("loggedin: "+this.loginService.isUserLoggedIn());
        console.log("index: "+req.url.indexOf('basicauth'));
        if (!this.loginService.isUserLoggedIn()) {           
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + window.btoa(this.loginService.username + ":" + this.loginService.password)
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}