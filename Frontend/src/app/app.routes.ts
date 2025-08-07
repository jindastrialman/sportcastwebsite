import { Routes } from '@angular/router';
import { AdminLoginPageComponent } from './pages/admin-panel/admin-login-page/admin-login-page.component';
import { AdminHomePageComponent } from './pages/admin-panel/admin-home-page/admin-home-page.component';
import { HomeComponent } from './pages/user-space/home/home.component';
import { AdminTeamPageComponent } from './pages/admin-panel/admin-team-page/admin-team-page.component';
import { AdminMatchPageComponent } from './pages/admin-panel/admin-match-page/admin-match-page.component';
import { AdminCommentsPageComponent } from './pages/admin-panel/admin-comments-page/admin-comments-page.component';
import { AdminCastersPageComponent } from './pages/admin-panel/admin-casters-page/admin-casters-page.component';
import { AdminBlogPageComponent } from './pages/admin-panel/admin-blog-page/admin-blog-page.component';
import { GamePlayerPageComponent } from './pages/user-space/game-player-page/game-player-page.component';
import { GameSchedulePageComponent } from './pages/user-space/game-schedule-page/game-schedule-page.component';
import { NewsPageComponent } from './pages/user-space/news-page/news-page.component';
import { ArticlePageComponent } from './pages/user-space/article-page/article-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ReplaysPageComponent } from './pages/user-space/replays-page/replays-page.component';

export const routes: Routes = [
    {path: 'admin/login', component: AdminLoginPageComponent},
    {path: 'admin/home', component: AdminHomePageComponent},
    {path: 'admin/team', component: AdminTeamPageComponent},
    {path: 'admin/match', component: AdminMatchPageComponent},
    {path: 'admin/comments', component: AdminCommentsPageComponent},
    {path: 'admin/casters', component: AdminCastersPageComponent},
    {path: 'admin/blog', component: AdminBlogPageComponent},
    {path: 'match/:id', component: GamePlayerPageComponent},
    {path: 'schedule/:id', component: GameSchedulePageComponent},
    {path: 'news/:id', component: NewsPageComponent},
    {path: 'article/:id', component: ArticlePageComponent},
    {path: '', component: HomeComponent},
    {path: 'replays/:id', component: ReplaysPageComponent},
    {path: 'test', component: TestPageComponent}
];
