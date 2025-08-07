import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormatter } from '../../../services/DateFormatter';
import { OtherNewsComponent } from "../other-news/other-news.component";
import { NewsService } from '../../../services/NewsService';
import { NewsType } from '../../../enums/news-type-enum';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-news-plates',
  imports: [OtherNewsComponent,NgIf],
  templateUrl: './news-plates.component.html',
  styleUrl: './news-plates.component.scss'
})
export class NewsPlatesComponent implements OnInit
{
  router = inject(Router);
  dateFormatter = inject(DateFormatter);
  newsService = inject(NewsService);

  @Input() SportType: number = -1;
  newses: Array<any> = [];
  
  async ngOnInit()
  {
    const additionalNews = await this.newsService.getMoreNews(this.SportType, NewsType.article , 0, 6);
    if(additionalNews?.length > 0){
      this.newses.push(...additionalNews);
    }
  }

  redirectToArticle(event: any)
  {
    this.router.navigate([""]).then(()=>this.router.navigate(['article/', event.id]));
  }
}
