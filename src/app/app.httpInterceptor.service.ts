import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    jwtToken: string;
    authorisation: string;
    
    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        if(this.loginService.isUserLoggedIn()) {
            this.authorisation = 'Bearer ' + sessionStorage.getItem('token');
        } else if (!this.loginService.isUserLoggedIn()) { 
            this.authorisation = 'Basic ' + window.btoa(this.loginService.username + ":" + this.loginService.password);         
        }    
        
        const authReq = req.clone({
                headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.authorisation
            })
        });
        
        return next.handle(authReq);       
    }
}