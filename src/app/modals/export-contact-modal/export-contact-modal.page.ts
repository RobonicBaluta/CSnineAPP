import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { NavParams, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/rest-api.service';

@Component({
  selector: 'app-export-contact-modal',
  templateUrl: './export-contact-modal.page.html',
  styleUrls: ['./export-contact-modal.page.scss'],
  providers: [Contacts],
})
export class ExportContactModalPage implements OnInit {
  contact:any;
  mobileContacId: any;
  mobileContacts:any;
  exportForm: FormGroup;
  select: any;
  arrayMails=['Introduce an email'];
  constructor(private contacts: Contacts,
    private navParams:NavParams,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    public api: RestApiService,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,

    ) { 
// this.select='herr';

  }
  ngOnInit() {

    this.exportForm = this.formBuilder.group({
      // 'salutationAsString': [''],  
      'firstName' : [''],
      'lastName' : [''],
      'mobile':[''],
      'telephone': [''],
      'email': [''],   
        
      'address': this.formBuilder.group({
        'country': this.formBuilder.group({
          'name': [''],
        }),
        'region': this.formBuilder.group({
          'name': [''],
        }),
        'city': this.formBuilder.group({
          'name': [''],
        }),
        'zip': this.formBuilder.group({
          'number': [''],
        }),
        'street': [''],
        
      }),
      
    
  });
    this.getContact();
    
  }

  // checkSalutation(){
    
  //   let salutation=this.select;
  //   // console.log(server);
  //   switch (salutation) {
  //     case 'herr':
  //     this.exportForm.get('salutationAsString').setValue('herr');
      
  //     break;
  //     case 'frau':
  //     this.exportForm.get('salutationAsString').setValue('frau');
  //     default:
      
  //     break;
  //   }
  // }
  async getContact() {
    await this.getId();
    // this.presentAlert(this.mobileContacId);
     const loading = await this.loadingController.create({
        message: 'Loading'
      });
    await loading.present();
    this.contacts.find(['id'],{filter: `${this.mobileContacId}`, multiple: true}).then(data => {
      this.mobileContacts = data
      
      this.mobileContacts.forEach(cont => {
        this.contact=cont; 
        // if(this.contact.emails==null||this.contact.emails==''){
        //   this.contact.emails=this.arrayMails;
        //   window.alert(this.contact.emails);
        //   window.alert(this.arrayMails+'arraymails');
        //   window.alert(this.contact.emails[0]+'no value');
        //   window.alert(this.contact.emails[0]);
        // }
        loading.dismiss();
     
        /*      this.contacts.find(['id'],{filter: `${this.mobileContacId}`, multiple: true}).then(data => {
        this.mobileContacts = data
        
        this.mobileContacts.forEach(cont => {
          this.contact=cont; 
          if(this.contact.emails==null){
            this.contact.emails.push('introduce an email');
          }
          
          
          this.exportForm.get('firstName').setValue(this.contact.displayName);
          this.exportForm.get('lastName').setValue(this.contact.displayName);
          if(this.contact.emails!=null){
            this.exportForm.get('email').setValue(this.contact.emails[0].value);
          }
          
          if(this.contact.phoneNumbers!=null){
            this.exportForm.get('mobile').setValue(this.contact.phoneNumbers[0].value);
            this.exportForm.get('telephone').setValue(this.contact.phoneNumbers[1].value);
          }*/
        
        // this.presentAlert(this.contact.phoneNumbers[0].value);
        // this.presentAlert(this.contact.emails[0].value);
      });
      
    }); 
  }

  async getId(){
    this.mobileContacId=this.navParams.get('exportContactId');
  }
  
  
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });
    
    await alert.present();
  }
  async exportContact(){

    // this.presentAlert(this.exportForm.value);
    await this.api.exportContact(this.exportForm.value)
    .subscribe(res => {
      this.closeModal();
      this.exportAlert();
    }, (err) => {
      console.log(err);
    });

  }


  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async exportAlert() {

    const alert = await this.alertCtrl.create({
      header: 'Add',
      message: 'Contact successfully exported to CS',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }




}
