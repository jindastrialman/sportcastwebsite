import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { VideoButtonComponent } from "../video-button/video-button.component";
import { NewsType } from '../../../enums/news-type-enum';
import { SmallVideoButtonComponent } from "../small-video-button/video-button.component";
import { NewsService } from '../../../services/NewsService';
import { MatchType } from '../../../enums/match-type-enum';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-small-video-tab-layout',
  imports: [MatTabsModule, SmallVideoButtonComponent, SmallVideoButtonComponent,NgIf],
  templateUrl: './video-tab-layout.component.html',
  styleUrl: './video-tab-layout.component.scss'
})
export class SmallVideoTabLayoutComponent implements OnInit{
  @Input() newses: Array<any> = new Array();
  @Input() matchType: number =-1;
  @Input() title: string = " ";
  @Output() VideoShowed = new EventEmitter<string>();

  router = inject(Router);

  selectedNews: any;
  selectedIndex: number = 0;
  newsService=inject(NewsService);

  constructor()
  {
  }

  async ngOnInit()
  {
    this.newsService.getMoreNews();
  }
  
  onLeftClick()
  {
    this.selectedIndex--;
  }
  onRightClick()
  {
    this.selectedIndex++;
  }
  onVideoButtonPressed(event: any)
  {
    if(event.blogType == NewsType.video || event.blogType == NewsType.videoReplay)
    {
      this.VideoShowed.emit(event.link);
    }
    if(event.blogType == NewsType.link)
    {
      window.open(event.link);
    }
    if(event.blogType == NewsType.article)
    {
        return;
    }
  }
  redirectToReplays()
  {
    this.router.navigate(["replays",this.matchType]);
  }
}