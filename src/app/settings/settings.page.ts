import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  booleanFlag2: boolean = false;
  value: any;

  constructor( public themeSwitcher: LayoutService, public authService: AuthService ) { }

  myChange(booleanFlag2) {
    console.log(this.booleanFlag2);
    if (booleanFlag2 == true){
      this.themeSwitcher.setTheme('night');
      booleanFlag2= true;
    }else{
      this.themeSwitcher.setTheme('day');
      booleanFlag2= false;
    }
}

  ngOnInit() {
  }


  logout() {
    this.authService.logout();
  }

}
