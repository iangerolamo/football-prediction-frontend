import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTeamsByCompetition(competition: string): Observable<string[]> {
    const url = `${this.baseUrl}/matches/teams?competition=${competition}`;
    return this.http.get<string[]>(url);
  }
}
