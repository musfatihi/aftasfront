import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Level} from "../../models/level/level.model";

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  private apiUrl:string='http://localhost:8080/api/v1/levels';

  constructor(private httpClient:HttpClient) {
  }

  getAllLevels():Observable<any>
  {
    return this.httpClient.get<any>(this.apiUrl);
  }

  saveLevel(level:Level):Observable<Level>{
    return this.httpClient.post<Level>(this.apiUrl,level);
  }

  deleteLevel(code:number):Observable<any>{
    return this.httpClient.delete<any>(this.apiUrl+"/"+code);
  }
}
