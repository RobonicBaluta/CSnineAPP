import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RestApiService } from '../rest-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  booleanFlag2: boolean;
  value: any;
  platform: any;
  toast: any;
  

  constructor( public toastCtrl: ToastController, public themeSwitcher: LayoutService, public authService: AuthService,public api: RestApiService ) {
    this.booleanFlag2;
    this.platform.backButton.subscribe(() => {
      this.toast.presentToast();
    });
    
   }

   async presentToast() {
    this.toast = await this.toastCtrl.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
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
   console.log(this.booleanFlag2);
   this.getStatus();
 
  }

  getStatus(){
    this.booleanFlag2=this.api.getStatus();
  }

  logout() {
    this.authService.logout();
  }

}
