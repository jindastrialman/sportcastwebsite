import { Component } from '@angular/core';
import { AdminPanelSidebarComponent } from "../../../components/admin-panel/admin-panel-sidebar/admin-panel-sidebar.component";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DataServiceAdress } from "../../../environmentals";

@Component({
  selector: 'app-admin-team-page',
  standalone: true,
  imports: [AdminPanelSidebarComponent,FormsModule,NgFor],
  templateUrl: './admin-team-page.component.html',
  styleUrl: './admin-team-page.component.scss'
})
export class AdminTeamPageComponent {

  newTeam = {
    name: "",
    description: "sample description",
    teamLogoUrl: ""
  }
  teams: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService)
  {
    this.refreshTeams();
    }
    onSelect(hero: any)
    {
      this.http.delete(`http://${DataServiceAdress}/api/Team/` + hero.id).subscribe(x=> this.refreshTeams());
    }
    async onSubmit(event: any)
    {
      this.uploadFile(event.srcElement[1].files[0]);
    }
    refreshTeams()
    {
      this.http.get(`http://${DataServiceAdress}/api/Team/GetAll`)
        .subscribe(x => 
          {
            this.teams = x;
            console.log(this.teams);
          });

    }
    fileName = '';

    async uploadFile(file : File) {

      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("file", file);
        const upload = await this.http.post(`http://${DataServiceAdress}/api/Image/load`, formData);

        upload.subscribe((x: any) => {});
        this.newTeam.teamLogoUrl = `http://${DataServiceAdress}/api/Image?id=`+ file.name;
        this.http.post(`http://${DataServiceAdress}/api/Team`, this.newTeam).subscribe(x=> {this.refreshTeams();console.log(x);});
      }
  }
}
