import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hunting} from "../../models/hunting/hunting.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HuntingsService {

  private apiUrl:string='http://localhost:8080/api/v1/';

  constructor(private httpClient:HttpClient) {
  }


  saveHunting(hunting: Hunting): Observable<Hunting> {
    return this.httpClient.post<Hunting>(`${this.apiUrl}huntings`,hunting);
  }
}
