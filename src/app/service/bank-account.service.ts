import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  createBankAccount(account: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}bank-account/create`, account);
  }
  
  getAccountsList (userId: number) : Observable<any> {    
    return this.http.get(`${this.baseUrl}bank-account/user/${userId}`);     
  }
  
  getAccountDetails(accountNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}bank-account/${accountNumber}`); 
  }
  
  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}bank-account/delete/${id}`); 
  }
}