import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, NavController, Events, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/rest-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-contact-modal',
  templateUrl: './show-contact-modal.page.html',
  styleUrls: ['./show-contact-modal.page.scss'],
})
export class ShowContactModalPage implements OnInit {
  contactId: any;
  contact: Observable <any>;
  contactForm: FormGroup;
  
  constructor(  private navParams:NavParams,
    private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    public api: RestApiService,
    private events:Events,
    public loadingController: LoadingController) { 
      
      
      
      this.contactForm = this.formBuilder.group({


        'id':[null],
        'firstName' : [null],
        'lastName' : [null],
        'mobile':[null],
        'telephone': [null],
        'email': [null], 
        'fax': [null],  
          
        'address': this.formBuilder.group({
          'country': this.formBuilder.group({
            'name': [null],
          }),
          'region': this.formBuilder.group({
            'name': [null],
          }),
          'city': this.formBuilder.group({
            'name': [null],
          }),
          'zip': this.formBuilder.group({
            'number': [null],
          }),
          'street': [null],
        }),
        
      

        // 'mobile':[null],
        // 'street':[null],
        // 'city':[null],
        // 'region':[null],
        // 'country':[null],
        // 'zip':[null],
        // 'fax':[null],
        
      });
    }
    
    ngOnInit() {
      this.getContactInfo();
    }



    async updateContact(){
      console.log(this.contactForm.value);
      await this.api.updateContact(this.contactForm.value).subscribe();
      
      this.presentAlert();
      this.doRefresh(this.events);
      // window.location.reload();
      //this.router.navigate(['/home']);
      
    }
    
    
    
    async getContactInfo(){
      
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      
      this.contactId=this.navParams.get('contactId');
      this.contact= await this.api.getContactById(this.contactId).subscribe(result=>{
        this.contact=result;
      })
      
      
      
      loading.dismiss();
    }


     
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Changes succesfully saved',
        buttons: ['OK']
      });
      
      await alert.present();
    }
    doRefresh(event) {
      this.getContactInfo();
      console.log('Begin async operation');
      
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  }
  