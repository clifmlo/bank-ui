import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public username: string;
  public password: string;

  constructor(private http: HttpClient, private router: Router) {

  }

  authenticate(username: string, password: string) :Observable<Object> { 
    this.username = username;
    this.password = password;
  
    return this.http.post(`${this.baseUrl}auth/user/signin`, null);
  }

  registerSuccessfulLogin(authenticatedUser: Object) {
    sessionStorage.setItem(this.USER, JSON.stringify(authenticatedUser))
  }

  logout() {
    sessionStorage.removeItem(this.USER);
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
  
  
    redirectUser() {
        var role=  this.getLoggedInUser().roles[0].name;
        if (role === "ADMIN") {
            this.router.navigate(['/clients']);
        } else if (role === "USER") {
            this.router.navigate(['/accounts']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}