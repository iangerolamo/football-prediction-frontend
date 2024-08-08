import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private baseUrl = environment.baseUrl; // Use a variável de ambiente

  constructor(private http: HttpClient) { }

  getTeamsByCompetition(competition: string): Observable<string[]> {
    const url = `${this.baseUrl}/matches/teams?competition=${competition}`;
    return this.http.get<string[]>(url);
  }
}
