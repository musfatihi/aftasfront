import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FishService} from "../services/fish/fish.service";
import {Fish} from "../models/fish/fish.model";
import {LevelsService} from "../services/levels/levels.service";
import {Level} from "../models/level/level.model";

@Component({
  selector: 'app-fishlist',
  templateUrl: './fishlist.component.html',
  styleUrls: ['./fishlist.component.scss']
})
export class FishlistComponent {
  addFishOn: boolean=true;
  saveFishForm!: FormGroup;
  fishList!:Fish[];
  levels!:Level[];

  constructor(private fishService:FishService,
              private levelsService:LevelsService,
              private fb:FormBuilder) {
  }

  ngOnInit(){
    this.getFishList();
    this.getLevels();
    this.saveFishForm = this.fb.group({
      name: [null,[Validators.required]],
      averageWeight: [null,[Validators.required]],
      level: [null,[Validators.required]]
    });
  }


  private getFishList() {
    this.fishService.getFishList().subscribe((data:any)=>{
      this.fishList = data.content;
    });
  }

  saveFish() {
    this.fishService.saveFish(this.saveFishForm.value).subscribe( (response) => {
        this.getFishList();
        this.saveFishForm.reset()
      },
      (error) => {
        console.log(error);
      });

  }

  addFishFormOn() {
    this.addFishOn=true;
  }


  private getLevels() {
    this.levelsService.getAllLevels().subscribe((data:any)=>{
      this.levels = data;
    });

  }


  deleteFish(name:string){
    this.fishService.deleteFish(name).subscribe( (level) => {
        this.getFishList();
      },
      (error) => {
        this.getFishList();
      });
  }
}
