import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { NavParams, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
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
this.select='herr';

  }
  ngOnInit() {

    this.exportForm = this.formBuilder.group({
      'salutationAsString': [''],  
      'firstName': ['',[Validators.required, Validators.min(1)]],
      'lastName': ['',[Validators.required, Validators.min(1)]],
      'mobile':[''],
      'telephone': [''],
      'email': ['',[Validators.required, Validators.min(1), Validators.email]],   
        
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


 
  checkSalutation(){
    
    let salutation=this.select;
    // console.log(server);
    switch (salutation) {
      case 'herr':
      this.exportForm.get('salutationAsString').setValue('herr');
      
      break;
      case 'frau':
      this.exportForm.get('salutationAsString').setValue('frau');
      default:
      
      break;
    }
  }
  async getContact() {
    await this.getId();
    this.presentAlert('Um den Kontakt erfolgreich zu exportieren, müssen Sie einige erforderliche Felder ausfüllen');
     const loading = await this.loadingController.create({
        message: 'Laden'
      });
    await loading.present();
    this.contacts.find(['id'],{filter: `${this.mobileContacId}`, multiple: true}).then(data => {
      this.mobileContacts = data
      
      this.mobileContacts.forEach(cont => {
        this.contact=cont; 

        loading.dismiss();
    
     
       
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
      // this.exportAlert();
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
      header: 'Alert',
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
