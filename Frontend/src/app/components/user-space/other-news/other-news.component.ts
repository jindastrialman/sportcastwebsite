import { Component, inject, Input, OnInit } from '@angular/core';
import { NewsService } from '../../../services/NewsService';
import { NewsType } from '../../../enums/news-type-enum';
import { MatchType } from '../../../enums/match-type-enum';
import { Router } from '@angular/router';
import { SportTypeConverter } from '../../../services/SportTypeConverter';
import { DateFormatter } from '../../../services/DateFormatter';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-other-news',
  imports: [NgIf],
  templateUrl: './other-news.component.html',
  styleUrl: './other-news.component.scss'
})
export class OtherNewsComponent implements OnInit {
  news: Array<any> = 
  [];
  newsService = inject(NewsService);
  @Input() InitialSkip = 0;
  @Input() PageSize = 5;
  @Input() InitialCount = 5;
  @Input() NewsType = 'article';
  @Input() SportType = -1;
  @Input() TitleDisabled = false;
  MatchType = MatchType;
  newsCount = 0;
  ifLoadMoreDisabled = false;
  router = inject(Router);
  sportTypeConverter = inject(SportTypeConverter);
  dateFormatter = inject(DateFormatter);

  async ngOnInit() {
    const additionalNews = await this.newsService.getMoreNews(this.SportType, this.NewsType, this.InitialSkip, this.InitialCount);
    if(additionalNews?.length > 0){
      this.news.push(...additionalNews);
    }
    this.newsCount += this.InitialCount;
    if(this.news.length < this.newsCount)
    {
      this.ifLoadMoreDisabled = true;
    }
  }

  redirectToArticle(event: any)
  {
    this.router.navigate([""]).then(()=>this.router.navigate(['article/', event.id]));
  }
  async loadMoreNews()
  {
    const additionalNews = await this.newsService.getMoreNews(this.SportType, this.NewsType, this.newsCount + this.InitialSkip, this.PageSize);
    if(additionalNews?.length > 0){
      this.news.push(...additionalNews);
    }
    this.newsCount += this.PageSize;
    if(this.news.length < this.newsCount)
    {
      this.ifLoadMoreDisabled = true;
    }
  }
}
