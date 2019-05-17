import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { AlertController, ModalController, LoadingController, NavParams } from '@ionic/angular';
import { IonSegment } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { EditCompanyModalPage } from '../modals/edit-company-modal/edit-company-modal.page';
import { ShowContactModalPage } from '../modals/show-contact-modal/show-contact-modal.page';


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
    contact:Observable<any>;
    
    constructor(public api: RestApiService,
        public modalController: ModalController,
        private contacts: Contacts,
        private alertController: AlertController ,
        public router: Router,
        public loadingController: LoadingController,
        private navParams:NavParams,
        ) {
            this.getContacts();
            this.getApiContacts();
        }
        ngOnInit() {
            this.getApiContacts();
            this.contactTab = 'cs';
        }
        
        
        
        
        setContactId(id:number){
            this.contactId=id;
            // console.log(this.companyId);
            this.showContactModal();
        }
        
        async getContactInfo(){
            
            const loading = await this.loadingController.create({
                message: 'Loading'
            });
            await loading.present();
            
            this.contactId=this.navParams.get('companyId');
            this.contact= await this.api.getContactById(this.contactId).subscribe(result=>{
                this.contact=result;
            })
            
            
            
            loading.dismiss();
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
        
        
        
        async getApiContacts() {
            this.csContacts=this.api.getContacts();
        }
        
        async getContacts() {
            this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
            .then(data => {
                this.mobileContacts = data
            });
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
    