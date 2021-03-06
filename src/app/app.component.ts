import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { RestApiService } from './rest-api.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private headerColor: HeaderColor,
    public api: RestApiService,
    private location:Location,

  ) {
    this.initializeApp();
    //console.log("Hola: " + this.router.url);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.router.url==='/login'){
        this.api.setBiz();
        
      }
      this.platform.backButton.subscribeWithPriority(0,() => {
       if(this.router.url=='/login'){
         this.router.navigate(['select-server']);
       this.api.setBiz();
       this.authService.storage.set('server','Internal CS');
       }else{
        this.location.back();
       }
      })
      // this.statusBar.overlaysWebView(false);

      // set status bar to white
 
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['select-server']);
        }
      });
    });
  }

  
} 
  