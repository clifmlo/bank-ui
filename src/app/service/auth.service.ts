import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }
    executeAuthService() {
        return this.http.get<Message>('http://localhost:8080/api/v1/');
    }
}
