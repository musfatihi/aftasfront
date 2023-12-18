import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Level} from "../models/level/level.model";
import {LevelsService} from "../services/levels/levels.service";

@Component({
  selector: 'app-levels-list',
  templateUrl: './levels-list.component.html',
  styleUrls: ['./levels-list.component.scss']
})
export class LevelsListComponent implements OnInit{
  addLevelOn: boolean=true;
  saveLevelForm!: FormGroup;

  constructor(private levelsService:LevelsService,
              private fb:FormBuilder) {
  }

  ngOnInit() {
    this.getLevels();
    this.saveLevelForm = this.fb.group({
      code: [null,[Validators.required]],
      description: [null,[Validators.required]],
      points: [null,[Validators.required]]
    });
  }


  levels!:Level[];

  private getLevels() {
    this.levelsService.getAllLevels().subscribe((data:any)=>{
      this.levels = data;
    });
  }

  saveLevel() {
    this.levelsService.saveLevel(this.saveLevelForm.value).subscribe( (level) => {
        console.log("Level ajouté avec succès");
        this.getLevels();
      },
      (error) => {
        console.log(error);
      });
  }

  addLevelFormOn() {
    this.addLevelOn = true;
  }

  deleteLevel(code:number){
    this.levelsService.deleteLevel(code).subscribe( (level) => {
        this.getLevels();
      },
      (error) => {
        this.getLevels();
      });
  }
}
