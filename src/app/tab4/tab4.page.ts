import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonSegment } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';


@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
    providers: [Contacts]
})
export class Tab4Page implements OnInit {

    @ViewChild (IonSegment) segment:IonSegment;
    allContacts:any;
    items:any;
    results: Observable<any>;
    constructor(public api: RestApiService, private contacts: Contacts,
        private alertController: AlertController , public router: Router,) {
            this.getContacts();
        }
        ngOnInit() {
            this.getItems();
            this.segment.value='cs';
        }

        async getItems() {
            this.results=this.api.getCompanies();
        }

        async getContacts() {
            this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
            .then(data => {
                this.allContacts = data
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
