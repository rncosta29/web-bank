import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DebitAccount } from '../types/models';

@Injectable({
  providedIn: 'root'
})
export class ApiAccountService {

  private readonly baseURL: string = 'API-ACCOUNT/api/v1/debit/personal-account-id'; // URL base da API

    constructor(private readonly http: HttpClient) {}

    // Método para buscar todas as faturas
    getAllDebits(personalAccounId: number): Observable<DebitAccount[]> {
      return this.http.get<DebitAccount[]>(`${this.baseURL}/${personalAccounId}`);
    }
}
