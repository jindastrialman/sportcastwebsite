import { Component, Input, Output, EventEmitter, Inject, inject} from '@angular/core';
import { NewsType } from '../../../enums/news-type-enum';
import { NgIf } from '@angular/common';
import { DateFormatter } from '../../../services/DateFormatter';

@Component({
  selector: 'app-small-video-button',
  imports: [NgIf],
  templateUrl: './video-button.component.html',
  styleUrl: './video-button.component.scss'
})
export class SmallVideoButtonComponent {
  @Input() newsModel: any;
  @Input() isReplaysPage = false;
  @Output() newsModelChange = new EventEmitter<any>();
  @Output() buttonPressed = new EventEmitter<any>();

  dateFormatter = inject(DateFormatter);

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
