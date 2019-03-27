import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  @ViewChild(IonSegment) segment:IonSegment;
  constructor(){}

  ngOnInit(){
    this.segment.value='new';
  }
 
  
}