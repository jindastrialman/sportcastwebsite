import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, input, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatchDto } from '../game-schedule-element/match-info';
import { NgFor, NgIf } from '@angular/common';
import { GameScheduleElementComponent } from "../game-schedule-element/game-schedule-element.component";
import { ScheduleService } from '../../../services/ScheduleService';
import { MatchConverter } from '../../../services/MatchConverter';
import { MatchContainerMode } from '../../../enums/match-container-mode';
import { DateFormatter } from '../../../services/DateFormatter';
import { GameScheduleDivisionComponent } from "../game-schedule-division/game-schedule-division.component";

@Component({
  selector: 'app-game-schedule-container',
  imports: [GameScheduleElementComponent, NgIf, GameScheduleDivisionComponent],
  templateUrl: './game-schedule-container.component.html',
  styleUrl: './game-schedule-container.component.scss'
})
export class GameScheduleContainerComponent implements OnInit, OnChanges {

  @Input() matchType: number = -1;
  @Output() matchTypeChange = new EventEmitter<number>();

  @Input() scheduleType: MatchContainerMode = MatchContainerMode.Current;

  MatchContainerMode = MatchContainerMode;

  
  matches: Array<MatchDto> = [new MatchDto()];

  showedMatches: Array<MatchDto> = [new MatchDto()];
  futureMatches: Array<MatchDto> = [new MatchDto()];
  showedMatchesByDay: Array<Array<MatchDto>> = [];
  matchesGroupedByDay: Array<Array<MatchDto>> = [];
  rawMatches: any;

  dateFormatter=inject(DateFormatter);

  constructor(private router: Router, private http: HttpClient, private scheduleService: ScheduleService, private matchConverter: MatchConverter)
  {
  }

  async ngOnInit() {
    this.rawMatches = await this.scheduleService.getMatches();

    this.reloadMatches()
  }

  ngOnChanges() {
    this.reloadMatches();
  }

  reloadMatches()
  {
    const filteredMatches = this.matchType == -1 ? this.rawMatches : this.rawMatches.filter((x: any) => x.matchType == this.matchType);
    const convertedMatches = this.matchConverter.convertToMatchDto(filteredMatches);
    
    this.matches = convertedMatches.filter(x => x.startTime <= new Date());
    this.futureMatches = convertedMatches.filter(x => x.startTime > new Date());
    this.setShowedMatches();
  }

  setShowedMatches()
  {
    switch (this.scheduleType)
    {
      case MatchContainerMode.Current:
      case MatchContainerMode.CurrentShort:
        this.showedMatches = this.matches.slice(0,6);
        return;

      case MatchContainerMode.CurrentFull:
        this.showedMatches = this.matches;
        return;
      
      case MatchContainerMode.FutureLight: 
        this.showedMatches = this.futureMatches;
        this.matchesGroupedByDay = Object.values(this.groupBy(this.showedMatches, (item) => this.groupByCallBack(item.startTime)));

        return;

      case MatchContainerMode.FutureDark:
        this.showedMatches = this.futureMatches;
        this.showedMatches = this.showedMatches.slice(0,5);
        return;
    }
  }

  groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    }, {} as Record<K, T[]>);

  onlyUnique(value: any, index: any, array: any) {
    return array.indexOf(value) === index;
  }

  groupByCallBack(startTime: Date)
  {
    return this.dateFormatter.formatDate(startTime);
  }

  updateMatchType(newType: number)
  {
    this.matchType = newType;
    this.reloadMatches();
    this.matchTypeChange.emit(this.matchType);
  }
  
  redirectToSchedule()
  {
    this.router.navigate([""]).then(()=>this.router.navigate(["schedule","-1"]));
  }

}
