import { Component } from '@angular/core';
import {Member} from "../models/member/member.model";
import {MembersService} from "../services/members/members.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent {

  members!:Member[];
  apiUrl:string = `http://localhost:8080/api/v1/members`;
  filterBy!:string;
  searched!:string;

  saveMemberForm!: FormGroup;

  addMemberOn:boolean=true;

  constructor(private membersService:MembersService,
              private fb:FormBuilder) {
  }

  ngOnInit(){
    this.getMembers(this.apiUrl);
    this.saveMemberForm = this.fb.group({
      name: [null,[Validators.required]],
      familyName: [null,[Validators.required]],
      nationality: [null,[Validators.required]],
      identityDocument:[null,[Validators.required]],
      identityNumber:[null,[Validators.required]],
    });
  }

  private getMembers(url:string) {

    this.membersService.getAllMembers(url).subscribe((data:any)=>{
      this.members = data;
    });

  }

  filter(){
    let url = `${this.apiUrl}?${this.filterBy}=${this.searched}`;
    this.getMembers(url);
  }

  saveMember() {
    this.membersService.saveMember(this.saveMemberForm.value).subscribe( (response) => {
        console.log("Membre ajouté avec succès");
        this.getMembers(this.apiUrl);
      },
      (error) => {
        console.log(error);
      });
  }

  addMemberFormOn() {
    this.addMemberOn=true;
  }

  deleteMember(num:number){
    this.membersService.deleteMember(num).subscribe( (level) => {
        this.getMembers(this.apiUrl);
      },
      (error) => {
        this.getMembers(this.apiUrl);
      });
  }
}
