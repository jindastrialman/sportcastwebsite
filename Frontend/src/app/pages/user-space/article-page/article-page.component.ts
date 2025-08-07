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
import { OtherNewsComponent } from '../../../components/user-space/other-news/other-news.component';
import { DataServiceAdress } from "../../../environmentals";

@Component({
  selector: 'app-article-page',
  imports: [FooterComponent, HeaderComponent, OtherNewsComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})
export class ArticlePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  
  newsId = -1;
  sportType = -1;
  article: any;
  articleHtml: any;

  ngOnInit() {
    this.newsId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`http://${DataServiceAdress}/api/Blog/` + this.newsId)
      .subscribe(x => {
        this.article = x;
        this.sportType = this.article.sportType;
        this.articleHtml = this.article.content.textContent;
      })
    }
}
//[(innerHtml)]="this.currentVideoFrame"