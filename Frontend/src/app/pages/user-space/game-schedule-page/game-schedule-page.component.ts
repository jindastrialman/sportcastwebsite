import { Component, inject, OnInit } from '@angular/core';
import {Event, RouterEvent, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { FooterComponent } from '../../../components/user-space/footer/footer.component';
import { HeaderComponent } from '../../../components/user-space/header/header.component';
import { GameScheduleContainerComponent } from "../../../components/user-space/game-schedule-container/game-schedule-container.component";
import { Meta, Title } from "@angular/platform-browser"
import { MatchContainerMode } from '../../../enums/match-container-mode';
import { MatchType } from '../../../enums/match-type-enum';


@Component({
  selector: 'app-game-schedule-page',
  imports: [FooterComponent, HeaderComponent, GameScheduleContainerComponent],
  templateUrl: './game-schedule-page.component.html',
  styleUrl: './game-schedule-page.component.scss'
})
export class GameSchedulePageComponent implements OnInit{
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  MatchContainerMode = MatchContainerMode;

  matchTypeId = -1;
  constructor()
  {
      this.router.events.pipe(
         filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
      ).subscribe((e: RouterEvent) => {
        const splitedUrl = e.url.split('/');
        this.matchTypeId = Number(splitedUrl[splitedUrl.length - 1]);
      });
  }
  ngOnInit()
  {
    this.matchTypeId = Number(this.route.snapshot.paramMap.get('id'));
  }
  setUpSeo()
  {
    
  }
  filterForAll()
  {
    this.matchTypeId = -1;
  }
  filterForFootball()
  {
    this.matchTypeId = MatchType.football;
  }
  filterForBasketball()
  {
    this.matchTypeId = MatchType.basketball;
  }
  filterForHokkey()
  {
    this.matchTypeId = MatchType.hokkey;
  }
  filterForNfl()
  {
    this.matchTypeId = MatchType.NFL;
  }
  filterForF1()
  {
    this.matchTypeId = MatchType.F1;
  }
  filterForTennis()
  {
    this.matchTypeId = MatchType.tennis;
  }
}
