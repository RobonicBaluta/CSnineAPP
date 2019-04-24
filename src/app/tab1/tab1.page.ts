import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
@ViewChild (IonSegment) segment:IonSegment;
  items:any;
  results: Observable<any>;

  constructor(public api: RestApiService,
    public modalController: ModalController,
    public localNotifications: LocalNotifications,
    public router: Router,
    ) {
      this.getItems();
    }

    async getItems() {
      this.results=this.api.getItems();
    }


    // async delete(itemId:string){
    //   // this.api.deleteItem(itemId);

    //   this.api.deleteItem(itemId)
    //   .subscribe(res => {
    //     this.router.navigate(['/home']);
    //   }, err => {
    //     console.log(err);
    //   });
    //   location.reload();
    // }


    ngOnInit() {
      // this.getItems();
      this.segment.value='new';

    }

    getNotifications() {

      this.localNotifications.schedule({
        id: 1,
        text: 'You have a new task awaiting'
      });

    }
    // async openModal() {
    //   const modal = await this.modalController.create({
    //     component: AddModalPage,
    //   });
    //   modal.onDidDismiss().then((dataReturned) => {
    //     if (dataReturned !== null) {
    //       console.log('Modal Sent Data :', dataReturned);
    //     }
    //   });

    //   return await modal.present();
    // }
    // doRefresh(event) {
    //   this.getItems();
    //   console.log('Begin async operation');

    //   setTimeout(() => {
    //     console.log('Async operation has ended');
    //     event.target.complete();
    //   }, 2000);
    // }
}
