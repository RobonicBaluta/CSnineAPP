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
  mobileContacts:any;
  constructor(private contacts: Contacts,
    private navParams:NavParams,
    public alertController: AlertController,
    ) { }
    
    ngOnInit() {
      this.getContact();
    }
    
    
  
    
    
    async getContact() {
      await this.getId();
      // this.presentAlert(this.mobileContacId);
      
      this.contacts.find(['id'],{filter: `${this.mobileContacId}`, multiple: true}).then(data => {
        this.mobileContacts = data
        
        this.mobileContacts.forEach(cont => {
          this.contact=cont;
        });
        
      });
      
    }
    
    async getId(){
      this.mobileContacId=this.navParams.get('mobileContactId');
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
  