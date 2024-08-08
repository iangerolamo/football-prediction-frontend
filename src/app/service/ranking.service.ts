import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RankingTeam } from '../shared/model/RankingTeam';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private baseUrl = environment.baseUrl; // Use a variável de ambiente

  constructor(private http: HttpClient) { }

  getRanking(competition: string): Observable<RankingTeam[]> {
    const url = `${this.baseUrl}/ranking/competition?competition=${competition}`;
    return this.http.get<RankingTeam[]>(url);
  }
}

