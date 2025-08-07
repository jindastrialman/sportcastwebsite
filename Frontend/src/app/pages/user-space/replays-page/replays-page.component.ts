import { Component, inject, OnInit } from '@angular/core';
import {Event, RouterEvent, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { FooterComponent } from '../../../components/user-space/footer/footer.component';
import { HeaderComponent } from '../../../components/user-space/header/header.component';
import { GameScheduleContainerComponent } from "../../../components/user-space/game-schedule-container/game-schedule-container.component";
import { Meta, Title } from "@angular/platform-browser"
import { MatchContainerMode } from '../../../enums/match-container-mode';
import { MatchType } from '../../../enums/match-type-enum';
import { ReplaysContainerComponent } from "../../../components/user-space/replays-container/replays-container.component";


@Component({
  selector: 'app-replays-page',
  imports: [FooterComponent, HeaderComponent, ReplaysContainerComponent],
  templateUrl: './replays-page.component.html',
  styleUrl: './replays-page.component.scss'
})
export class ReplaysPageComponent implements OnInit
{
  router = inject(Router);
  currentVideoFrame: string = ""
  isOverlayEnabled = false;
  matchTypeId = -1;
  ngOnInit()
  {
    this.router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
   ).subscribe((e: RouterEvent) => {
     const splitedUrl = e.url.split('/');
     this.matchTypeId = Number(splitedUrl[splitedUrl.length - 1]);
   });
  }
  
  onVideoShow(link: any)
  {
    this.currentVideoFrame = link;
    this.isOverlayEnabled = true;
  }
  onPlayerFadeout()
  {
    this.currentVideoFrame = "";
    this.isOverlayEnabled = false;
  }
}
