import { Component, ViewChild } from '@angular/core';
import { IonSegment, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Observable } from 'rxjs'; 
import { RestApiService } from '../rest-api.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteModalPage } from '../modals/note-modal/note-modal.page';
import { AddCompanyModalPage } from '../modals/add-company-modal/add-company-modal.page';
import { EditCompanyModalPage } from '../modals/edit-company-modal/edit-company-modal.page';
import { AddTaskModalPage } from '../modals/add-task-modal/add-task-modal.page';

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

    setCompanyIdNote(id:number){
      this.companyId=id;
      console.log(this.companyId);
      this.noteModal();
    }

   setCompanyIdTask(id:number){
      this.companyId=id;
      console.log(this.companyId);
      this.addTaskModal();
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


    async  noteModal() {
      const modal = await this.modalController.create({
        component: NoteModalPage,
        cssClass: 'note-custom-modal',
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



    async  addTaskModal() {
      const modal = await this.modalController.create({
        component: AddTaskModalPage,
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
   doRefresh(event) {
      this.getCompanies();
      console.log('Begin async operation');

      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }

}
