import { Component, Input, Output, EventEmitter} from '@angular/core';
import { NewsType } from '../../../enums/news-type-enum';

@Component({
  selector: 'app-video-button',
  imports: [],
  templateUrl: './video-button.component.html',
  styleUrl: './video-button.component.scss'
})
export class VideoButtonComponent {
  @Input() newsModel: any;
  @Output() newsModelChange = new EventEmitter<any>();
  @Output() buttonPressed = new EventEmitter<any>();
  onButtonClick()
  {
    this.buttonPressed.emit(this.newsModel);
  }
  updateNewsModel(newType: number): void
  {
    this.newsModel = newType;
    this.newsModelChange.emit(this.newsModel);
  }
}
