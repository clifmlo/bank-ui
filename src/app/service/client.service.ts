import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  getClient(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}user/${id}`);
  }

  createClient(client: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}auth/admin/signup`, client);
  }

  updateClient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}user/delete/${id}`);
  }

  getClientsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}user/all`);
  }
}