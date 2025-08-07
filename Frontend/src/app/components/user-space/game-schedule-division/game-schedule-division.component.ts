import { Component, inject, Input, OnInit } from '@angular/core';
import { MatchDto } from '../game-schedule-element/match-info';
import { GameScheduleElementComponent } from '../game-schedule-element/game-schedule-element.component';
import { NgFor } from '@angular/common';
import { DateFormatter } from '../../../services/DateFormatter';

@Component({
  selector: 'app-game-schedule-division',
  imports: [GameScheduleElementComponent],
  templateUrl: './game-schedule-division.component.html',
  styleUrl: './game-schedule-division.component.scss'
})
export class GameScheduleDivisionComponent implements OnInit {
    @Input() matches: Array<MatchDto> = new Array<MatchDto>();
    dateFormatter = inject(DateFormatter);
    date: any;
    ngOnInit()
    {
      this.date = this.dateFormatter.formatDate(this.matches[0].startTime);
    }
}
