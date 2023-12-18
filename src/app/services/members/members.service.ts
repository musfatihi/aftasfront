import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../../models/member/member.model";

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private apiUrl:string='http://localhost:8080/api/v1/';

  constructor(private httpClient:HttpClient) {
  }

  getAllMembers(url:string):Observable<any>
  {
    return this.httpClient.get<any>(url);
  }

  saveMember(member: Member): Observable<Member> {
    return this.httpClient.post<Member>(`${this.apiUrl}members`,member);
  }

  deleteMember(num:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.apiUrl}members/${num}`);
  }
}
