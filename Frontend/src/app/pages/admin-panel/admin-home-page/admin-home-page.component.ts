import { Component } from '@angular/core';
import { AdminPanelSidebarComponent } from '../../../components/admin-panel/admin-panel-sidebar/admin-panel-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [AdminPanelSidebarComponent],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.scss'
})
export class AdminHomePageComponent{
    constructor(private http: HttpClient, private router: Router, private auth: AuthService)
    {
    }
}
