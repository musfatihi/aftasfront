import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fish} from "../../models/fish/fish.model";

@Injectable({
  providedIn: 'root'
})
export class FishService {

  private apiUrl:string='http://localhost:8080/api/v1/fish';

  constructor(private httpClient:HttpClient) {
  }

  getFishList():Observable<any>
  {
    return this.httpClient.get<any>(this.apiUrl);
  }

  saveFish(fish:Fish):Observable<Fish>
  {
    return this.httpClient.post<Fish>(this.apiUrl,fish);
  }

  deleteFish(name:string):Observable<any>{
    return this.httpClient.delete<any>(this.apiUrl+"/"+name);
  }
}
