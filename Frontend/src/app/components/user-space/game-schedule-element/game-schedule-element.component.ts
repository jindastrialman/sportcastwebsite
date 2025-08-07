import { Component, Input } from '@angular/core';
import { MatchDto } from './match-info';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-game-schedule-element',
  standalone: true,
  imports: [NgIf],
  templateUrl: './game-schedule-element.component.html',
  styleUrl: './game-schedule-element.component.scss'
})
export class GameScheduleElementComponent {
  @Input() IsMatchActive: boolean = true;
  @Input() MatchInfo: MatchDto = new MatchDto();

  @Input() IsDarkTheme: boolean = false;
  @Input() IsShort: boolean = false;
  @Input() IsButtonShowed: boolean = true;

  constructor(private router: Router) {}

  ButtonClicked() {
    this.router.navigate(['match/', this.MatchInfo.matchId]);
  };
}
