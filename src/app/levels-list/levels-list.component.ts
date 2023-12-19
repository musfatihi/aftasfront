import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Level} from "../models/level/level.model";
import {LevelsService} from "../services/levels/levels.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-levels-list',
  templateUrl: './levels-list.component.html',
  styleUrls: ['./levels-list.component.scss']
})
export class LevelsListComponent implements OnInit{
  addLevelOn: boolean=true;
  saveLevelForm!: FormGroup;

  levels!:Level[];

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

  private getLevels() {
    this.levelsService.getAllLevels().subscribe((data:any)=>{
      this.levels = data;
    });
  }

  saveLevel() {
    this.levelsService.saveLevel(this.saveLevelForm.value).subscribe( (level) => {
        this.getLevels();
        this.saveLevelForm.reset()
      },
      (error) => {
        Swal.fire({
          title: 'Erreur',
          text: 'Données incorrectes',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  addLevelFormOn() {
    this.addLevelOn = true;
  }

  deleteLevel(code:number){
    this.levelsService.deleteLevel(code).subscribe({
      next: () => {
       this.getLevels();
      },error:(err) =>{
        this.getLevels();
      }
    });
  }

}
