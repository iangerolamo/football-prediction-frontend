import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistics } from '../shared/model/Statistics';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl = environment.baseUrl; // Use a variável de ambiente

  constructor(private http: HttpClient) { }

  getStatistics(teamName: string, type: string): Observable<Statistics> {
    const url = `${this.baseUrl}/statistics`;
    let params = new HttpParams();
    params = params.set('teamName', teamName).set('type', type);

    return this.http.get<Statistics>(url, { params });
  }
}
