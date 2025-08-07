import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';
import { SignInResult } from './signin-result';
import { CookieService } from 'ngx-cookie-service';
import { DataServiceAdress } from "../../../environmentals";

@Component({
  selector: 'app-admin-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login-page.component.html',
  styleUrl: './admin-login-page.component.scss'
})
export class AdminLoginPageComponent implements OnInit{

  constructor(private http: HttpClient, private router: Router, private auth: AuthService){}

  ngOnInit(): void {
  }

  user = {
    email: null,
    password: null
  };


  onSubmit(event: any) {
    this.http.post(`http://${DataServiceAdress}/api/Login/Login`, this.user)
      .subscribe(x =>
        {
          const result = x as SignInResult;
          if(result.isSuccess === true && result.permissionLevel >= 3){
            this.auth.setAuth(result.permissionLevel, result.cookieString);
            console.log(this.user);
            this.router.navigate(["admin","home"]);
          }
        })
        
      console.log(event);
  }
}
