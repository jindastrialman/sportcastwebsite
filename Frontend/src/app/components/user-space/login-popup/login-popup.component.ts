import { Component, OnInit } from '@angular/core';
import * as VKID from '@vkid/sdk';

@Component({
  selector: 'app-login-popup',
  imports: [],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.scss'
})
export class LoginPopupComponent implements OnInit{

  ngOnInit()
  {
  
  }
  
  onTGLogin()
  {
    
  }
  onVkLogin()
  {

    VKID.Config.init({
      app: 53416510,
      redirectUrl: 'localhost:4200/test',
      responseMode: VKID.ConfigResponseMode.Callback,
      source: VKID.ConfigSource.LOWCODE,
      scope: 'email phone', // Заполните нужными доступами по необходимости
    });

    const floatingOneTap = new VKID.FloatingOneTap();

    floatingOneTap.render({
      appName: 'sportcast.online',
      showAlternativeLogin: true
    })
    .on(VKID.WidgetEvents.ERROR, vkidOnError)
    .on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, function (payload : any) {
      const code = payload.code;
      const deviceId = payload.device_id;

      VKID.Auth.exchangeCode(code, deviceId)
        .then(vkidOnSuccess)
        .catch(vkidOnError);
    });
  
    function vkidOnSuccess(data: any) {
      floatingOneTap.close();
      
      // Обработка полученного результата
    }
  
    function vkidOnError(error: any) {
      // Обработка ошибки
    }
  }
}

 
