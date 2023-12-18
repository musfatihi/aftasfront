import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import {ButtonModule} from "primeng/button";
import { RadioButtonModule } from 'primeng/radiobutton';

import { CompetitionsListComponent } from './competitions-list/competitions-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MembersListComponent } from './members-list/members-list.component';
import { FishlistComponent } from './fishlist/fishlist.component';
import { LevelsListComponent } from './levels-list/levels-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsListComponent,
    MembersListComponent,
    FishlistComponent,
    LevelsListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    RadioButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
