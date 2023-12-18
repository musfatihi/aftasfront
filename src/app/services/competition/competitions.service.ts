import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Competition} from "../../models/competition/competition.model";

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  private apiUrl:string='http://localhost:8080/api/v1/competitions';


  constructor(private httpClient:HttpClient) {
  }

  getAllCompetitions(url:string):Observable<any>
  {
    return this.httpClient.get<any>(url);
  }


  closeCompetition(code:string):Observable<any>
  {
    return this.httpClient.get<any>(`${this.apiUrl}/close/${code}`);
  }

  saveCompetition(competition:Competition):Observable<Competition>{
    return this.httpClient.post<Competition>(`${this.apiUrl}`,competition);
  }
}
