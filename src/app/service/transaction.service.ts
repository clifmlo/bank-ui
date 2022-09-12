import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposit } from '../model/deposit';
import { Transfer } from "../model/transfer";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }
  
  deposit(deposit: Deposit): Observable<Object> {
    return this.http.post(`${this.baseUrl}transaction/deposit`, deposit);
  }
  
  transfer(transfer: Transfer): Observable<Object> {
      console.log("caledddddd");
    return this.http.post(`${this.baseUrl}transaction/transfer`, transfer);
  }
}