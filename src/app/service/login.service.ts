import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/api/v1/';
  authenticatedUser: Object;
  USER = 'authenticated_user';
  BASIC_AUTH = 'basic_auth';
  TOKEN = 'token';

  public username: string;
  public password: string;

  constructor(private http: HttpClient, private router: Router) {

  }

  authenticate(username: string, password: string) :Observable<Object> { 
    this.username = username;
    this.password = password;
    
    return this.http.get(`${this.baseUrl}auth/user/signin`);
  }

  registerSuccessfulLogin(response: Object) {
        var user = response['user'];
        var token = response['token'];
        sessionStorage.setItem(this.USER, JSON.stringify(user));
        sessionStorage.setItem(this.TOKEN, token);
  }

  logout() {
    sessionStorage.removeItem(this.USER);
    sessionStorage.removeItem(this.TOKEN);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER)
    if (user === null) return false
    return true
  }

  getLoggedInUser() {
    let user = JSON.parse(sessionStorage.getItem(this.USER))
    if (user === null) return ''
    return user
  }

  getLoggedInRole() {
    return this.getLoggedInUser().roles[0].name;    
  }
  
    redirectUser() {
        if (this.isUserLoggedIn() == false) {
            this.router.navigate(['/login']);
        }
        var userAccount =  this.getLoggedInUser();
        var role = userAccount.roles[0].name;
        if (userAccount.active === false) {
            this.router.navigate(['/password/change'], { skipLocationChange: true });
        } else if (role === "ADMIN") {            
            window.location.href="/clients"
        } else if (role === "USER") {            
            window.location.href="/accounts"
        } else {
            this.router.navigate(['/login']);
        }
    }
}