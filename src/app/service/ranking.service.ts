import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RankingTeam } from '../shared/model/RankingTeam';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private apiUrl = 'http://localhost:8080/ranking/competition';

  constructor(private http: HttpClient) { }

  getRanking(competition: string): Observable<RankingTeam[]> {
    const url = `${this.apiUrl}?competition=${competition}`;
    return this.http.get<RankingTeam[]>(url);
  }
}

