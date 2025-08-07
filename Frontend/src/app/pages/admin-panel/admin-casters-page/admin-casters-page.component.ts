import { Component } from '@angular/core';
import { AdminPanelSidebarComponent } from '../../../components/admin-panel/admin-panel-sidebar/admin-panel-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DataServiceAdress } from "../../../environmentals";

@Component({
  selector: 'app-admin-casters-page',
  standalone: true,
  imports: [AdminPanelSidebarComponent,FormsModule,NgFor],
  templateUrl: './admin-casters-page.component.html',
  styleUrl: './admin-casters-page.component.scss'
})
export class AdminCastersPageComponent {
  newCaster = {
    name: "",
    surname: "",
  }
  casters: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService)
  {
    this.refreshCasters();
    }
    onSelect(caster: any)
    {
      this.http.delete(`http://${DataServiceAdress}/api/Caster/` + caster.id).subscribe(x=> this.refreshCasters());
    }
    onSubmit(event: any)
    {
      this.http.post(`http://${DataServiceAdress}/api/Caster`, this.newCaster).subscribe(x=> {this.refreshCasters();console.log(x);});
    }
    refreshCasters()
    {
      this.http.get(`http://${DataServiceAdress}/api/Caster/GetAll`)
        .subscribe(x => 
          {
            this.casters = x;
            console.log(this.casters);
          });

    }
}
