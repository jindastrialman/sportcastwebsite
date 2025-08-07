import { Component } from '@angular/core';
import { AdminPanelSidebarComponent } from '../../../components/admin-panel/admin-panel-sidebar/admin-panel-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { NgFor } from '@angular/common';
import { DataServiceAdress } from "../../../environmentals";

@Component({
  selector: 'app-admin-comments-page',
  standalone: true,
  imports: [AdminPanelSidebarComponent,NgFor],
  templateUrl: './admin-comments-page.component.html',
  styleUrl: './admin-comments-page.component.scss'
})
export class AdminCommentsPageComponent {
  constructor(private http: HttpClient, private router: Router, private auth: AuthService)
  {
    this.refreshComments();
  }
  comments: any;
  
  refreshComments()
  {
    this.http.get(`http://${DataServiceAdress}/api/Commentary/GetLast`)
      .subscribe(x => 
        {
          this.comments = x;
          console.log(this.comments);
        });
  }
  onSelect(comment: any)
  {
    this.http.delete(`http://${DataServiceAdress}/api/Commentary/` + comment.id).subscribe(x=> this.refreshComments());
  }
}

