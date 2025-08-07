import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../../../components/user-space/footer/footer.component';
import { HeaderComponent } from '../../../components/user-space/header/header.component';
import { MiddleContainerComponent } from "../../../components/user-space/middle-container/middle-container.component";
import { MatchDto } from '../../../components/user-space/game-schedule-element/match-info';
import { Meta, Title } from "@angular/platform-browser"
import { GameScheduleElementComponent } from '../../../components/user-space/game-schedule-element/game-schedule-element.component';
import { MatchConverter } from '../../../services/MatchConverter';
import { GameScheduleContainerComponent } from "../../../components/user-space/game-schedule-container/game-schedule-container.component";
import { MatchContainerMode } from '../../../enums/match-container-mode';
import { DataServiceAdress } from "../../../environmentals";

@Component({
  selector: 'app-game-player-page',
  imports: [FooterComponent, HeaderComponent, GameScheduleElementComponent, GameScheduleContainerComponent],
  templateUrl: './game-player-page.component.html',
  styleUrl: './game-player-page.component.scss'
})
export class GamePlayerPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly matchConverter = inject(MatchConverter);

  matchId = -1;
  match: any;
  sanitizedMatch: any;
  mediaPlayerCode: any;
  MatchContainerMode = MatchContainerMode;

  ngOnInit() {
    this.matchId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`http://${DataServiceAdress}/api/Schedule/`+ this.matchId)
      .subscribe(x => {
        this.match = x;
        this.mediaPlayerCode = this.match.mediaPlayerUrl;
        this.sanitizedMatch = this.matchConverter.convertToMatchDto([this.match])[0];
      })
    }
  
  setUpSeo()
  {
    this.titleService.setTitle(this.match.seoTitle)
    /** Awesome Website meta tags **/
    this.metaService.updateTag({
      name: "description",
      content: (this.match.seoDescription as string).replace("{Название}", this.match.seoTitle),
    })
  }
}
