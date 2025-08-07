import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { DataServiceAdress } from '../../../environmentals';

@Component({
  selector: 'app-admin-panel-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel-sidebar.component.html',
  styleUrl: './admin-panel-sidebar.component.scss'
})
export class AdminPanelSidebarComponent {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService)
    {
      
      this.http.get(`http://${DataServiceAdress}/api/Login/SignInAdmin`)
        .subscribe({next: (res) => console.log(res),
                   error: (err) => this.router.navigate(["admin","login"])});
    }
    onNavigationClick = (event: any) =>
    {
      switch(event.currentTarget.id)
      {
        case "1":
          this.router.navigate(["admin","home"]);
          return;
        case "2":
          this.router.navigate(["admin","team"]);
          return;
        case "3":
          this.router.navigate(["admin","match"]);
          return;
        case "4":
          this.router.navigate(["admin","comments"]);
          return;
        case "5":
          this.router.navigate(["admin","casters"]);
          return;
        case "6":
          this.router.navigate(["admin","blog"]);
          return;
      }
    }
}
