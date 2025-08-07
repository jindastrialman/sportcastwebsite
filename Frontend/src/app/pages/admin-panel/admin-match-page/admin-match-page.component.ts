import { ChangeDetectionStrategy, Component, inject, makeEnvironmentProviders, OnInit } from '@angular/core';
import { AdminPanelSidebarComponent } from "../../../components/admin-panel/admin-panel-sidebar/admin-panel-sidebar.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { MatchType } from '../../../enums/match-type-enum';
import { NgFor } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { DataServiceAdress } from "../../../environmentals";
import { MatSelectModule } from '@angular/material/select';
import { matchesGlob } from 'path';
import { SportTypeConverter } from '../../../services/SportTypeConverter';

@Component({
  selector: 'app-admin-match-page',
  standalone: true,
  imports: [AdminPanelSidebarComponent, NgFor, FormsModule,
            MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule,
            OwlDateTimeModule, OwlNativeDateTimeModule, MatSelectModule],
  providers: [  
    provideNativeDateAdapter(),  
  ],
  templateUrl: './admin-match-page.component.html',
  styleUrl: './admin-match-page.component.scss',
})
export class AdminMatchPageComponent implements OnInit {

  matchConverter = inject(SportTypeConverter);
  constructor(private http: HttpClient, private auth: AuthService)
  {
  }
  async ngOnInit() {
    this.matchTypes = Object.keys(MatchType).filter((item) => {
      return isNaN(Number(item));
    });

    this.refreshMatches();
    await this.http.get(`http://${DataServiceAdress}/api/Caster/GetAll`)
      .subscribe(x => 
        {
          this.casters = x;
        });
    await this.http.get(`http://${DataServiceAdress}/api/Team/GetAll`)
      .subscribe(x => 
        {
          this.teams = x;
        });
      
  }

  selectedMatch: any;
  matchTypes:any;
  matches: any;
  teams: any;
  casters: any;
  formMatch = {
    matchStartTime: Date(),
    startShowTime:  Date(),
    endShowTime:  Date(),
    seoTags: "",
    seoTitle: "",
    seoDescription: "",
    mediaPlayerUrl: "",
    isMatchEnded: false,
    matchType: 0,
    matchTeams: [
      "", ""
    ],
    matchCasters: [
      ""]
  };
  newMatch = {
    id: 0,
    matchStartTime: Date(),
    startShowTime:  Date(),
    endShowTime:  Date(),
    seoTags: "string",
    seoTitle: "",
    seoDescription: "",
    mediaPlayerUrl: "string",
    isMatchEnded: false,
    matchType: 0,
    matchTeams: [
      {
        teamId: "1"
      },
      {
        teamId: "1"
      }
    ],
    matchCasters: [
      {
        casterId: "2"
      }]
  };

  onSelect(event: any, match: any)
  {
    this.selectedMatch = structuredClone(match);
    this.formMatch = structuredClone(match);



    const caster = this.casters.find((element: any) => {return element.id == match.matchCasters[0].casterId;});
    const team1 = this.teams.find((element: any) => {return element.id == match.matchTeams[0].teamId;});
    const team2 = this.teams.find((element: any) => {return element.id == match.matchTeams[1].teamId;});


    this.formMatch.matchCasters[0] = caster.id + ' ' + caster.name + ' ' + caster.surname;
    this.formMatch.matchTeams[0] = team1.id + ' ' + team1.name;
    this.formMatch.matchTeams[1] = team2.id + ' ' + team2.name;
  }

  async createNewMatch()
  {
    this.newMatch.id = 0;
    this.newMatch.matchStartTime = this.formMatch.matchStartTime;
    this.newMatch.startShowTime = this.formMatch.startShowTime;
    this.newMatch.endShowTime = this.formMatch.endShowTime;
    this.newMatch.seoTags = this.formMatch.seoTags;
    this.newMatch.seoDescription = this.formMatch.seoDescription;
    this.newMatch.seoTitle = this.formMatch.seoTitle;
    this.newMatch.mediaPlayerUrl = this.formMatch.mediaPlayerUrl;
    this.newMatch.isMatchEnded = this.formMatch.isMatchEnded;
    this.newMatch.matchType = this.formMatch.matchType;
    this.newMatch.matchCasters[0].casterId = this.formMatch.matchCasters[0].split(" ")[0];
    this.newMatch.matchTeams[0].teamId = this.formMatch.matchTeams[0].split(" ")[0];
    this.newMatch.matchTeams[1].teamId = this.formMatch.matchTeams[1].split(" ")[0];

    await this.http.post(`http://${DataServiceAdress}/api/Schedule`, this.newMatch).subscribe(x=> {this.refreshMatches();console.log(x);});
    await this.refreshCacheForMatches();
  }

  async updateMatch()
  {
    this.newMatch.id = this.selectedMatch.id
    this.newMatch.matchStartTime = this.formMatch.matchStartTime;
    this.newMatch.startShowTime = this.formMatch.startShowTime;
    this.newMatch.endShowTime = this.formMatch.endShowTime;
    this.newMatch.seoTags = this.formMatch.seoTags;
    this.newMatch.seoDescription = this.formMatch.seoDescription;
    this.newMatch.seoTitle = this.formMatch.seoTitle;
    this.newMatch.mediaPlayerUrl = this.formMatch.mediaPlayerUrl;
    this.newMatch.isMatchEnded = this.formMatch.isMatchEnded;
    this.newMatch.matchType = this.formMatch.matchType;
    this.newMatch.matchCasters[0].casterId = this.formMatch.matchCasters[0].split(" ")[0];
    this.newMatch.matchTeams[0].teamId = this.formMatch.matchTeams[0].split(" ")[0];
    this.newMatch.matchTeams[1].teamId = this.formMatch.matchTeams[1].split(" ")[0];

    this.http.put(`http://${DataServiceAdress}/api/Schedule/`+ this.selectedMatch.id, this.newMatch).subscribe(x=> {this.refreshMatches();console.log(x);});
    this.refreshCacheForMatches();
  }
  async deleteMatch()
  {
    this.http.delete(`http://${DataServiceAdress}/api/Schedule/` + this.selectedMatch.id).subscribe(x=> this.refreshMatches());
    this.refreshCacheForMatches();
  }
  refreshCacheForMatches()
  {
    this.http.get(`http://${DataServiceAdress}/api/Schedule/UpdateMatchesCache`).subscribe(x => x);
  }
  refreshMatches()
  {
    this.http.get(`http://${DataServiceAdress}/api/Schedule/GetLast`)
      .subscribe(x => 
        {
          this.matches = x;
          console.log(this.matches);
        });
  }
  getButtonFormattedString(match: any)
  {
    return match.id + " " + 
    this.matchConverter.translateSportType(match.matchType) + " " +
    match?.matchStartTime + " " + 
    match?.matchTeams[0]?.team?.name + " " +
    match?.matchTeams[1]?.team?.name + " " +

    match?.matchCasters[0]?.caster?.name + " " + 
    match?.matchCasters[0]?.caster?.surname;
  }
}
