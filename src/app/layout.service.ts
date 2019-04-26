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
  private currentTheme: number = 0;

  constructor( private domCtrl: DomController, @Inject(DOCUMENT) private document ) {

    this.themes = [
      {
        name: 'day',
        styles: [
          { themeVariable: '--ion-text-color', value: '#000000'},
          { themeVariable: '--ion-color-light', value: '#f4f5f8'},
          { themeVariable: '--ion-color-dark', value: '#000000'},
          { themeVariable: '--ion-placeholder-color', value: '#000000'},
          { themeVariable: '--ion-background-color', value: '#f4f5f8'}
        ]
      },
      {
        name: 'night',
        styles: [
          { themeVariable: '--ion-text-color', value: '#FFFFFF'},
          { themeVariable: '--ion-color-light', value: '#000000'},
          { themeVariable: '--ion-color-dark', value: '#FFFFFF'},
          { themeVariable: '--ion-placeholder-color', value: '#FFFFFF'},
          //{ themeVariable: '--ion-toolbar-border-color', value: '#FF0000'},
          { themeVariable: '--ion-background-color', value: '#000000'}
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
