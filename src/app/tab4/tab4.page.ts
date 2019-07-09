import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { IonSegment } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { EditCompanyModalPage } from '../modals/edit-company-modal/edit-company-modal.page';
import { ShowContactModalPage } from '../modals/show-contact-modal/show-contact-modal.page';
import { ShowMobileContactModalPage } from '../modals/show-mobile-contact-modal/show-mobile-contact-modal.page';
import { ExportContactModalPage } from '../modals/export-contact-modal/export-contact-modal.page';


@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
    providers: [Contacts]
})
export class Tab4Page implements OnInit {
    
    @ViewChild (IonSegment) segment:IonSegment;
    mobileContacts:any;
    csContacts:Observable<any>;
    items:any;
    contactTab: string;
    contactId: number;
    mobileContactId: number;
    contact:Observable<any>;
    displayNameFilter: any;
    descending: boolean = true;
    order: number;
    column: string = 'firstName';
    constructor(public api: RestApiService,
        public modalController: ModalController,
        private contacts: Contacts,
        private alertController: AlertController ,
        public router: Router,
        public loadingController: LoadingController,
        ) {
            this.getContacts();
            this.getApiContacts();
        }
        ngOnInit() {
            this.getApiContacts();
            this.contactTab = 'cs';
        }
        
        sort(){
            // this.descending = !this.descending;
            this.order = this.descending ? 1 : -1;
          }
        
        
        setContactId(id:number){
            this.contactId=id;
            // console.log(this.companyId);
            this.showContactModal();
        }
        
        setMobileContactId(id:number){
            this.mobileContactId=id;
            // console.log(this.companyId);
            this.showMobileContactModal();
        }
        
        setExportContactId(id:number){
            this.mobileContactId=id;
            // console.log(this.companyId);
            this.showExportContactModal();
        }
        
        async showExportContactModal() {
            const modal = await this.modalController.create({
                component: ExportContactModalPage,
                componentProps:{
                    exportContactId: this.mobileContactId,
                    
                }
            });
            modal.onDidDismiss().then((dataReturned) => {
                if (dataReturned !== null) {
                    console.log('Modal Sent Data :', dataReturned);
                }
            });
            return await modal.present();
        }
        async showContactModal() {
            const modal = await this.modalController.create({
                component: ShowContactModalPage,
                componentProps:{
                    contactId: this.contactId,
                    
                }
            });
            modal.onDidDismiss().then((dataReturned) => {
                if (dataReturned !== null) {
                    console.log('Modal Sent Data :', dataReturned);
                }
            });
            return await modal.present();
        }
        
        
        async showMobileContactModal() {
            const modal = await this.modalController.create({
                component: ShowMobileContactModalPage,
                componentProps:{
                    mobileContactId: this.mobileContactId,
                    
                }
            });
            modal.onDidDismiss().then((dataReturned) => {
                if (dataReturned !== null) {
                    console.log('Modal Sent Data :', dataReturned);
                }
            });
            return await modal.present();
        }
        
        
        async getApiContacts() {
            const loading = await this.loadingController.create({
                message: 'Laden'
            });
            await loading.present();
           this.csContacts= await this.api.getContacts();
           this.sort();
            loading.dismiss();
        }
        
        async getContacts() {
            const loading = await this.loadingController.create({
                message: 'Laden'
            });
            await loading.present();
            this.contacts.find(['id','displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
            .then(data => {
                this.mobileContacts = data
                console.log(this.mobileContacts);
            });
            loading.dismiss();
        }
        
        
        async getFilteredContacts(filterValue) {
            
            
            this.contacts.find(['displayName'], {filter: `${filterValue}`, multiple: true})
            .then(data => {
                this.mobileContacts = data
                console.log(this.mobileContacts);
            });
            
        }
        
        
        
        
        async importAlert(){
            const alert = await this.alertController.create({
                header: 'Confirm!',
                message: '<strong>Do you want to export contact?</strong>',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Okay',
                        handler: () => {
                            console.log('Confirm Okay');
                        }
                    }
                ]
            });
            await alert.present();
            
        }
        async importAllAlert(){
            const alert = await this.alertController.create({
                header: 'Confirm!',
                cssClass: 'alert',
                message: '<strong>Do you want to export ALL contacts?</strong>',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Okay',
                        handler: () => {
                            console.log('Confirm Okay');
                        }
                    }
                ]
            });
            await alert.present();
            
        }
        
        doRefresh(event) {
            this.getApiContacts();
            console.log('Begin async operation');
            
            setTimeout(() => {
                console.log('Async operation has ended');
                event.target.complete();
            }, 2000);
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
    