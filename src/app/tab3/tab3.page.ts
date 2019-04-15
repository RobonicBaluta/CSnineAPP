import { Component, ViewChild } from '@angular/core';
import { IonSegment, AlertController } from '@ionic/angular';
import {Location} from '@angular/common';
import {Observable} from 'rxjs'; 
import { RestApiService } from '../rest-api.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteModalPage } from '../modals/note-modal/note-modal.page';
import { AddCompanyModalPage } from '../modals/add-company-modal/add-company-modal.page';
import { EditCompanyModalPage } from '../modals/edit-company-modal/edit-company-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  items:any;
  companies: Observable<any>;
  companyId: number;
  constructor(public api: RestApiService, 
    public modalController: ModalController,
    public router: Router, private alertController: AlertController) {
  
    }
    
    ngOnInit() {
      this.getCompanies();
    }

    async getCompanies(){
      this.companies=this.api.getCompanies();
    }


    // Establish the company id when click to pass the variable to the modal to get caught in the modal page
    setCompanyId(id:number){
      this.companyId=id;
      // console.log(this.companyId);
      this.editModal();
    }
    
    
  
    async editModal() {
      const modal = await this.modalController.create({
        component: EditCompanyModalPage,
        cssClass: 'addCompanyCustom',
        componentProps:{
          companyId: this.companyId,
        
        }
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          console.log('Modal Sent Data :', dataReturned);
        }
      });     
      return await modal.present();
    }


    // doRefresh(event) {
    //   this.getItems();
    //   console.log('Begin async operation');
      
    //   setTimeout(() => {
    //     console.log('Async operation has ended');
    //     event.target.complete();
    //   }, 2000);
    // }


    async  noteModal() {
      const modal = await this.modalController.create({
        component: NoteModalPage,
        cssClass: 'note-custom-modal',
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned !== null) {
          console.log('Modal Sent Data :', dataReturned);
        }
      });
      
      return await modal.present();
    }
    async  addCompanyModal() {
      const modal = await this.modalController.create({
        component: AddCompanyModalPage,
        cssClass: 'addCompanyCustom',
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



