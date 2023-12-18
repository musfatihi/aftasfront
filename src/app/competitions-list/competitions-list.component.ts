import { Component, OnInit} from '@angular/core';
import {CompetitionsService} from "../services/competition/competitions.service";
import {Competition} from "../models/competition/competition.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MembersService} from "../services/members/members.service";
import {Member} from "../models/member/member.model";
import {RankingsService} from "../services/rankings/rankings.service";
import {RankingResp} from "../models/ranking/rankingResp.model";
import {Fish} from "../models/fish/fish.model";
import {FishService} from "../services/fish/fish.service";
import {HuntingsService} from "../services/huntings/huntings.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.scss']
})
export class CompetitionsListComponent implements OnInit{

  actualPage:number=0;
  isFirstPage:boolean=true;
  isLastPage:boolean=true;

  stateCompetition:string='pending';
  apiUrl!:string;

  competitions!: Competition[];
  allMembers!:Member[];
  players!:RankingResp[];
  fishList!:Fish[];
  top3!:RankingResp[];


  //------------------------------Forms----------------------------------------
  saveCompetitionForm!:FormGroup;
  saveRankingForm!:FormGroup;
  saveHuntingForm!:FormGroup;
  //--------------------------------------------------------------------------


  //buttons to display forms
  addCompetitionOn:boolean=true;
  addRankingOn:boolean=false;
  addHuntingOn:boolean=false;
  showLeaderBoardOn:boolean=false;
  //-----------------------------------------


  selectedCompetition!:Competition;

  formWrapper!: any;

  closeAllForms(){
    this.addCompetitionOn=false;
    this.addRankingOn=false;
    this.addHuntingOn=false;
    this.showLeaderBoardOn=false;
  }

  constructor(private competitionsService:CompetitionsService,
              private membersService:MembersService,
              private rankingsService:RankingsService,
              private fishService:FishService,
              private huntingsService:HuntingsService,
              private fb:FormBuilder
              ) {
  }

  ngOnInit(): void {
    this.getCompetitions();
    this.saveCompetitionForm = this.fb.group({
      date: [null,[Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      numberOfParticipants:[2,Validators.required],
      location:[null,Validators.required],
      amount:[null,Validators.required]
    });

    this.saveRankingForm = this.fb.group({
      member: [null,[Validators.required]],
      competition: [null,[Validators.required]]
    });

    this.saveHuntingForm = this.fb.group({
      member: [null,[Validators.required]],
      competition: [null,[Validators.required]],
      fish:[null,[Validators.required]],
      numberOfFish:[null,[Validators.required]]
    });

    }

  getCompetitions(){
    this.generateUrl();
    this.competitionsService.getAllCompetitions(this.apiUrl).subscribe((data:any)=>{
      this.competitions = data.content;
      this.isFirstPage=data.pageable.pageNumber==0;
      this.isLastPage=data.last;
    });
  }

  getAllMembers(){
    this.membersService.getAllMembers('http://localhost:8080/api/v1/members').subscribe((data:any)=>{
      this.allMembers = data;
    });
  }

  getFishList(){
    this.fishService.getFishList().subscribe((data:any)=>{
      this.fishList = data.content;
    });
  }

  generateUrl(){
    this.apiUrl = `http://localhost:8080/api/v1/competitions?status=${this.stateCompetition}&page=${this.actualPage}&size=5`;
  }



  //----------------------------Paging------------------------------
  prev() {
    this.actualPage--;
    this.getCompetitions();

  }

  reset() {
    this.actualPage = 0;
    this.getCompetitions();
  }

  next() {
    this.actualPage++;
    this.getCompetitions();
  }
  //---------------------------------------------------------------------



  //---------------------------------------add new Competition----------------------
  saveCompetition() {
    const competition:Competition = this.saveCompetitionForm.value;
    this.competitionsService.saveCompetition(competition).subscribe((competition) => {
        this.getCompetitions();
      },
      (error) => {
      console.log(error)
        Swal.fire({
          title: 'Erreur',
          text: 'Données incorrectes',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
  }

  addCompetitionFormOn(){
    this.closeAllForms();
    this.addCompetitionOn=true;
  }

  //--------------------------------------------------------------------------------------


  //----------------------------------------assign a member to a competition------------


  addRankingFormOn(competition:Competition){
    this.getAllMembers();
    this.selectedCompetition = competition;
    this.closeAllForms();
    this.addRankingOn=true;
  }

  saveRanking() {
    this.formWrapper={
      rankingCompositeKey:this.saveRankingForm.value
    }

    this.rankingsService.saveRanking(this.formWrapper).subscribe(
      (savedRanking) => {
        console.log("ranking saved avec succès");
        this.getCompetitions();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //-------------------------------------------------------------------------

  //---------------------------------add Hunting------------------------------
  addHuntingFormOn(competition:Competition) {

    this.getFishList();

    this.selectedCompetition = competition;
    this.players = this.selectedCompetition.rankingList;

    this.closeAllForms();
    this.addHuntingOn=true;

  }

  //--------------------------------------------------------------------
  saveHunting() {
    this.huntingsService.saveHunting(this.saveHuntingForm.value).subscribe(
      (savedHunting) => {
        console.log("hunting saved avec succès");
      },
      (error) => {
        console.log(this.saveHuntingForm.value);
        console.log(error);
      }
    );
  }

  //---------------------------------------Close competition--------------------------

  closeCompetition(code:string) {
    this.competitionsService.closeCompetition(code).subscribe(
      (response) => {
        console.log("competition fermée avec succès");
      },
      (error) => {
        console.log(error);
      });
  }


  isCloseable(competition:Competition){
    return  new Date().getTime()>=new Date(competition.date+' '+competition.startTime).getTime();
  }


  showLeaderBoard(code:string) {
    this.closeAllForms();
    this.rankingsService.getLeaderBoard(code).subscribe((data) => {
      this.top3=data;
    })
    this.showLeaderBoardOn=true;
  }

  isTherePlaces(competition:Competition):boolean{
    return competition.rankingList.length<competition.numberOfParticipants;
  }

  isRegistrationValid(competition:Competition){

    const oneDayInMillis: number = 1000 * 60 * 60 * 24;

    return  new Date().getTime()+oneDayInMillis<new Date(competition.date+' '+competition.startTime).getTime();

  }

  isHuntingValid(competition:Competition){

    return new Date().getTime()>=new Date(competition.date+' '+competition.startTime).getTime() &&
           new Date().getTime()<=new Date(competition.date+' '+competition.endTime).getTime();

  }

  updateState(){
    this.actualPage=0;
    this.getCompetitions();
  }

}
