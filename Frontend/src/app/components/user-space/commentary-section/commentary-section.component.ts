import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommentaryService } from '../../../services/CommentaryService';

@Component({
  selector: 'app-commentary-section',
  imports: [],
  templateUrl: './commentary-section.component.html',
  styleUrl: './commentary-section.component.scss'
})
export class CommentarySectionComponent implements OnInit {
  private readonly commentService = inject(CommentaryService);

  @Input() matchId: number = 0;
  @Output() matchIdChange = new EventEmitter<number>();

  private comments: any;
  async ngOnInit() {
      this.comments = await this.commentService.getComments(this.matchId);
  }
  updateMatchId(newId: number): void
  {
    this.matchId = newId;
    this.matchIdChange.emit(this.matchId);
  }
}
