import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SmallVideoButtonComponent } from '../small-video-button/video-button.component';
import { NewsType } from '../../../enums/news-type-enum';
import { NewsService } from '../../../services/NewsService';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-replays-container',
  imports: [SmallVideoButtonComponent,NgIf],
  templateUrl: './replays-container.component.html',
  styleUrl: './replays-container.component.scss'
})
export class ReplaysContainerComponent implements OnInit {
  PageSize = 8;
  InitialCount = 8;
  NewsType = 'video-replay';
  @Input() SportType = -1;
  newsCount = 0;
  ifLoadMoreDisabled = false;
  newsPartitions = Array<Array<any>>();
  @Output() VideoShowed = new EventEmitter<string>();
  newsService = inject(NewsService);

  async ngOnInit(){
      await this.loadMore();
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

  async loadMore()
  {
    const additionalNews = await this.newsService.getMoreNews(this.SportType, this.NewsType, this.newsCount, this.PageSize);
    this.newsPartitions.push(additionalNews);
    this.newsCount += this.PageSize;

    if(additionalNews.length < this.PageSize)
    {
      this.ifLoadMoreDisabled = true
    }
  }

}
