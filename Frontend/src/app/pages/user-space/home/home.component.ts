import { Component } from '@angular/core';
import { FooterComponent } from '../../../components/user-space/footer/footer.component';
import { HeaderComponent } from '../../../components/user-space/header/header.component';
import { GameScheduleContainerComponent } from "../../../components/user-space/game-schedule-container/game-schedule-container.component";
import { OtherNewsComponent } from '../../../components/user-space/other-news/other-news.component';
import { MatchContainerMode } from '../../../enums/match-container-mode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, GameScheduleContainerComponent, OtherNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  MatchContainerMode = MatchContainerMode;

}
