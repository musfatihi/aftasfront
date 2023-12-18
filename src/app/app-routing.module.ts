import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompetitionsListComponent} from "./competitions-list/competitions-list.component";
import {MembersListComponent} from "./members-list/members-list.component";
import {FishlistComponent} from "./fishlist/fishlist.component";
import {LevelsListComponent} from "./levels-list/levels-list.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path:"competitions",component:CompetitionsListComponent},
  {path:"members",component:MembersListComponent},
  {path:"fishList",component:FishlistComponent},
  {path:"levels",component:LevelsListComponent},
  {path:"home",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
