import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordChange } from '../model/password-change';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

    private baseUrl = 'http://localhost:8080/api/v1/';

    constructor(private http: HttpClient) { }

    updatePassword(passwordChange: PasswordChange): Observable<Object> {
        return this.http.post(`${this.baseUrl}auth/user/password/change`, passwordChange);
    }
}