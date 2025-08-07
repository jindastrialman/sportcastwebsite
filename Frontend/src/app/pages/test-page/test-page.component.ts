import { Component } from '@angular/core';
import { VideoTabLayoutComponent } from "../../components/user-space/video-tab-layout/video-tab-layout.component";
import { link } from 'fs';
import { NewsType } from '../../enums/news-type-enum';
import { OtherNewsComponent } from "../../components/user-space/other-news/other-news.component";
import { SmallVideoButtonComponent } from '../../components/user-space/small-video-button/video-button.component';
import { SmallVideoTabLayoutComponent } from '../../components/user-space/small-video-tab-layout/video-tab-layout.component';
import { GameScheduleContainerComponent } from "../../components/user-space/game-schedule-container/game-schedule-container.component";
import { MatchContainerMode } from '../../enums/match-container-mode';
import { NewsPlatesComponent } from "../../components/user-space/news-plates/news-plates.component";
import { HeaderComponent } from "../../components/user-space/header/header.component";
import { LoginPopupComponent } from "../../components/user-space/login-popup/login-popup.component";
import { CommentarySectionComponent } from "../../components/user-space/commentary-section/commentary-section.component";
import { AdminBlogPageComponent } from "../admin-panel/admin-blog-page/admin-blog-page.component";

@Component({
  selector: 'app-test-page',
  imports: [NewsPlatesComponent, GameScheduleContainerComponent, HeaderComponent, LoginPopupComponent, CommentarySectionComponent, VideoTabLayoutComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent {
  currentVideoFrame: string = ""
  isOverlayEnabled = false;
  
  MatchContainerMode = MatchContainerMode;
  newses: any = 
  [
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.video,
      link: '<iframe src="https://vk.com/video_ext.php?oid=-165950127&id=456239044&hd=2&autoplay=1" width="853" height="480" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>'
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },
    {
      title: "aaaaaaaaaaaaaaaaaaaaaaa",
      pictureUrl: "http://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/71/3c/49629e1d4eca1125891c6fd581c5.png",
      blogType: NewsType.link,
      link: "http://youtu.be/dQw4w9WgXcQ?si=yT3J1ZDPj6drsBUQ"
    },];
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
