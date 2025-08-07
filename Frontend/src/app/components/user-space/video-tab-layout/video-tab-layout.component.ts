import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { VideoButtonComponent } from "../video-button/video-button.component";
import { NewsType } from '../../../enums/news-type-enum';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-video-tab-layout',
  imports: [MatTabsModule, VideoButtonComponent,NgIf],
  templateUrl: './video-tab-layout.component.html',
  styleUrl: './video-tab-layout.component.scss'
})
export class VideoTabLayoutComponent {
  @Input() newses: Array<any> = new Array();
  @Input() title: string = " ";
  @Output() VideoShowed = new EventEmitter<string>();

  newsTabs: Array<any> = new Array();
  selectedNews: any;
  selectedIndex: number = 0;
  constructor()
  {
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
}