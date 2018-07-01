import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { StandingsComponent } from './standings/standings.component';
import { GameComponent } from './game/game.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { GroupsComponent } from './groups/groups.component';
import { EighthComponent } from './eighth/eighth.component';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { GroupComponent } from './group/group.component';



const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'eighth', component: EighthComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'groups', component: GroupsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    StandingsComponent,
    GameComponent,
    GroupsComponent,
    EighthComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule ,
    Ng2FilterPipeModule   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
