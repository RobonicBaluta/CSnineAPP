import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, NavController, Events, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
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

  constructor(  private navParams:NavParams,
    private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public alertController: AlertController,
    public api: RestApiService,
    private events:Events,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getContactInfo();
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
}
