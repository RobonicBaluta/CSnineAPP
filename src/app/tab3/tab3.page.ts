import { Component, ViewChild } from '@angular/core';
import { IonSegment, AlertController } from '@ionic/angular';
import {Location} from '@angular/common';
import {Observable} from 'rxjs'; 
import { RestApiService } from '../rest-api.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteModalPage } from '../note-modal/note-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  items:any;
  results: Observable<any>;
  constructor(public api: RestApiService, 
    public modalController: ModalController,
    public router: Router, private alertController: AlertController) {
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
      this.getItems();
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


    async openModal() {
      const modal = await this.modalController.create({
        component: NoteModalPage,
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          console.log('Modal Sent Data :', dataReturned);
        }
      });
      
      return await modal.present();
    }


    async presentAlertPrompt() {
      const alert = await this.alertController.create({
        header: 'Write a note',
        inputs: [
          {
            name: 'title',
            type: 'text',
            placeholder: 'title'
          },
          {
            name: 'note',
            type: 'text',
            // id: 'name2-id',
            // value: 'hello',
            placeholder: 'Note'
          },

        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
      });
  
      await alert.present();
    }
}



