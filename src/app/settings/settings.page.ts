import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  booleanFlag2: boolean;
  value: any;
  checkPage: any;

  constructor( public router: Router,
    public themeSwitcher: LayoutService,
    public authService: AuthService, 
    public api: RestApiService,
    public platform: Platform,
    public navctrl: NavController ) {
    this.booleanFlag2;
    //console.log(this.router.url);

    platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigateByUrl("/tabs/tabs/tabs5");
    });
   }

  myChange(booleanFlag2) {
    console.log(this.booleanFlag2);
    if (booleanFlag2 == true){
      
      this.themeSwitcher.setTheme('night');
      booleanFlag2= true;
    }else{
      this.themeSwitcher.setTheme('day');
      booleanFlag2= false;
    }
    this.api.setStatus(booleanFlag2);
}

  ngOnInit() {
   this.getStatus();
 
  }

  getStatus(){
    this.booleanFlag2=this.api.getStatus();
  }

  logout() {
    this.authService.logout();
  }

}
