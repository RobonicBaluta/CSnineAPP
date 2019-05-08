import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';


interface Theme {
  name: string;
  styles: ThemeStyle[];
}

interface ThemeStyle {
  themeVariable: string;
  value: string;
}


@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private themes: Theme[] = [];

  constructor( private domCtrl: DomController, @Inject(DOCUMENT) private document ) {

    this.themes = [
      {
        name: 'day',
        styles: [
          { themeVariable: '--ion-text-color', value: '#000000'},                 //Black
          { themeVariable: '--ion-color-light', value: '#f4f5f8'},                //White
          { themeVariable: '--ion-color-dark', value: '#000000'},                 //Black
          { themeVariable: '--ion-color-medium', value: '#989aa2'},               //"Grey"
          { themeVariable: '--ion-color-primary', value: '#15489E'},              //CS Blue
          { themeVariable: '--ion-overlay-background-color', value: '#f4f5f8'},   //White
          { themeVariable: '--ion-background-color', value: '#f4f5f8'}            //White
        ]
      },
      {
        name: 'night',
        styles: [
          { themeVariable: '--ion-text-color', value: '#FFFFFF'},
          { themeVariable: '--ion-color-light', value: '#3f3f3f'},
          { themeVariable: '--ion-color-dark', value: '#FFFFFF'},
          { themeVariable: '--ion-color-medium', value: '#FFFFFF'},
          { themeVariable: '--ion-color-primary', value: '#F78022'},
          { themeVariable: '--ion-overlay-background-color', value: '#3f3f3f'},
          { themeVariable: '--ion-background-color', value: '#3f3f3f'}
        ]
      }
    ]

   }

  setTheme(name): void {

    let theme = this.themes.find(theme => theme.name === name);

    this.domCtrl.write(() => {

      theme.styles.forEach(style => {
        document.documentElement.style.setProperty(style.themeVariable, style.value);
      });

    });

  }
}
