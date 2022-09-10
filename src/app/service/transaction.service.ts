import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposit } from '../model/deposit';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }
  
  deposit(deposit: Deposit): Observable<Object> {
    return this.http.post(`${this.baseUrl}transaction/deposit`, deposit);
  }
}