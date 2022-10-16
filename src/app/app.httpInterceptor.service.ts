import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    basicAuth: string;
    
    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        if(this.loginService.isUserLoggedIn()) {
            this.basicAuth = sessionStorage.getItem('basic_auth');
        } else if (!this.loginService.isUserLoggedIn()) { 
            this.basicAuth = 'Basic ' + window.btoa(this.loginService.username + ":" + this.loginService.password);         
        }    
        
        const authReq = req.clone({
                headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.basicAuth
            })
        });
        
        return next.handle(authReq);       
    }
}