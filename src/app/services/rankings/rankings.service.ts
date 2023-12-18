import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ranking} from "../../models/ranking/ranking.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private apiUrl:string='http://localhost:8080/api/v1/';

  constructor(private httpClient:HttpClient) {
  }

  saveRanking(ranking: Ranking): Observable<Ranking> {
    return this.httpClient.post<Ranking>(`${this.apiUrl}rankings`,ranking);
  }


  getLeaderBoard(code:string):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}rankings/competition/${code}`);
  }
}
