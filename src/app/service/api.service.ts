import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataItem, Card, SendNewBills } from '../types/models'; // Importe os tipos definidos anteriormente

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseURL: string = 'http://localhost:8765/API-BANK/api/v1'; // URL base da API

  constructor(private readonly http: HttpClient) {}

  // Método para buscar todas as faturas
  getAllBills(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(`${this.baseURL}/bills`);
  }

  // Método para buscar todos os cartões de crédito
  getAllCreditCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseURL}/credit-card`);
  }

  // Método para buscar faturas por ID do cartão de crédito
  getAllBillsByCreditCard(creditCardId: number): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(`${this.baseURL}/bills/creditCardId/${creditCardId}`);
  }

  // Método para enviar novas faturas
  postData(data: SendNewBills, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/bills/insert/${quantity}`, data);
  }

  // Método para excluir faturas
  deleteBills(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/bills/${id}`);
  }
}
