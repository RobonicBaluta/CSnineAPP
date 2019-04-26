import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  booleanFlag2: boolean = false;
  value: any;

  constructor( public themeSwitcher: LayoutService ) { }

  myChange(booleanFlag2) {
    console.log(this.booleanFlag2);
    if (booleanFlag2 == true){
      this.themeSwitcher.setTheme('night');
    }else{
      this.themeSwitcher.setTheme('day');
    }
}

async pruebaFondo(){
  this.themeSwitcher.setTheme('night');
}

  ngOnInit() {
  }

}
