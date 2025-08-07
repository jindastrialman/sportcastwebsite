
import { FooterComponent } from '../../../components/user-space/footer/footer.component';
import { HeaderComponent } from '../../../components/user-space/header/header.component';
import { Component, inject, OnInit } from '@angular/core';
import {Event, RouterEvent, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { GameScheduleContainerComponent } from "../../../components/user-space/game-schedule-container/game-schedule-container.component";
import { Meta, Title } from "@angular/platform-browser"
import { OtherNewsComponent } from '../../../components/user-space/other-news/other-news.component';
import { NewsType } from '../../../enums/news-type-enum';
import { SmallVideoTabLayoutComponent } from '../../../components/user-space/small-video-tab-layout/video-tab-layout.component';
import { VideoTabLayoutComponent } from '../../../components/user-space/video-tab-layout/video-tab-layout.component';
import { NewsService } from '../../../services/NewsService';
import { MatchContainerMode } from '../../../enums/match-container-mode';
import { NewsPlatesComponent } from "../../../components/user-space/news-plates/news-plates.component";

@Component({
  selector: 'app-news-page',
    imports: [FooterComponent, HeaderComponent, SmallVideoTabLayoutComponent, VideoTabLayoutComponent, GameScheduleContainerComponent, NewsPlatesComponent],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly newsService = inject(NewsService);
  currentVideoFrame: string = ""
  isOverlayEnabled = false;
  matchTypeId = -1;
  videoReplays: any;
  videos: any;
  MatchContainerMode = MatchContainerMode;

  newses: any = 
  [
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.video,
      link: '<iframe width="560" height="315" src="http://www.youtube.com/embed/dQw4w9WgXcQ?si=DvexijleWO5T9mff" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    }];

  constructor()
  {
      this.router.events.pipe(
         filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
      ).subscribe((e: RouterEvent) => {
        const splitedUrl = e.url.split('/');
        this.matchTypeId = Number(splitedUrl[splitedUrl.length - 1]);
      });
  }
  async ngOnInit() {
    this.matchTypeId = Number(this.route.snapshot.paramMap.get('id'));
    this.videoReplays = await this.newsService.getMoreNews(this.matchTypeId, NewsType.videoReplay, 0, 16);
    this.videos = await this.newsService.getMoreNews(this.matchTypeId, NewsType.video, 0, 12);
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
