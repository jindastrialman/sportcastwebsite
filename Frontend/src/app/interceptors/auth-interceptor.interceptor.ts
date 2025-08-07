import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/AuthService';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { EventType } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const AuthInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const cookieService = inject(CookieService)

  const newReq = req.clone({
    withCredentials: true,
  });

  return next(newReq).pipe(tap(event => {
    if (event instanceof HttpResponse) {
      console.log(event);
      console.log(event.headers);
      console.log(event.body);
      
}}));
};
