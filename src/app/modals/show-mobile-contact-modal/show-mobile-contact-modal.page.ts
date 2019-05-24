import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-show-mobile-contact-modal',
  templateUrl: './show-mobile-contact-modal.page.html',
  styleUrls: ['./show-mobile-contact-modal.page.scss'],
  providers: [Contacts],
})
export class ShowMobileContactModalPage implements OnInit {
  contact:any;
  mobileContacId: any;
  constructor(private contacts: Contacts,
    private navParams:NavParams,
    public alertController: AlertController,
    ) { }

  ngOnInit() {
    this.getContact();
  }








//   async getContacts() {
//     // const loading = await this.loadingController.create({
//     //     message: 'Loading'
//     // });
//     // await loading.present();
//     this.contacts.find(['id','displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
//     .then(data => {
//         this.mobileContacts = data
//         console.log(this.mobileContacts);
//     });
//     // loading.dismiss();
// }



async getContact() {
  this.mobileContacId=this.navParams.get('mobileContactId');
  this.presentAlert(this.mobileContacId);

 await this.contacts.find(['id','displayName', 'name', 'phoneNumbers', 'emails'],{filter: `${this.mobileContacId}`, multiple: true}).then(data => {
    this.contact = data
    this.presentAlert(this.contact.displayName);
});
this.presentAlert(this.contact.displayName);

}




async presentAlert(msg) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: msg,
    buttons: ['OK']
  });
  
  await alert.present();
}
}
