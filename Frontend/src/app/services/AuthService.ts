import { inject, Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class AuthService
{
    cookieService = inject(CookieService);
    constructor(){}
    private readonly CURRENT_SESSION_AUTH = {permissionLevel: -1, IsAuthenticate: false, Cookie: ""};
    private readonly COOKIE_NAME = ".AspNetCore.Cookies";

    setAuth(permissionLevel: number, cookie: string)
    {
        this.CURRENT_SESSION_AUTH.permissionLevel = permissionLevel;
        this.CURRENT_SESSION_AUTH.IsAuthenticate = true;
        this.CURRENT_SESSION_AUTH.Cookie = cookie.split("=")[1].split(';')[0];
        this.cookieService.set(this.COOKIE_NAME,this.CURRENT_SESSION_AUTH.Cookie, undefined ,'/', '185.178.44.140');
    }
    logout()
    {
        this.CURRENT_SESSION_AUTH.IsAuthenticate = false;
        this.CURRENT_SESSION_AUTH.permissionLevel = -1;
        this.CURRENT_SESSION_AUTH.Cookie = "";
        this.cookieService.delete(this.COOKIE_NAME);
    }
    getAuth()
    {
        return this.CURRENT_SESSION_AUTH;
    }
}