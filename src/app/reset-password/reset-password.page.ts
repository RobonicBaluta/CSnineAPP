import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavParams, ModalController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  reset: FormGroup;
  select:string='http://csapi.soltystudio.com/api/v1';
  constructor( private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    private modalController: ModalController,
    public api: RestApiService,  ) {


      this.reset = this.formBuilder.group({
        'email' : [null],
        'securityPin' : [null],
      });}
    

  @ViewChild('myNav') nav: NavController
    async presentAlert() {
      
      const alert = await this.alertCtrl.create({
        header: 'Recover',
        cssClass: 'alert',
        message: 'An email has been sent to you',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
  
      await alert.present();
    }

    async resetPassword(){
      await this.api.resetPassword(this.reset.value)
      .subscribe(res => {
        this.presentAlert();
        this.router.navigate(['/login']);
  
      }, (err) => {
        console.log(err);
      });
    }
    async closeModal() {
      const onClosedData: string = "Wrapped Up!";
      await this.modalController.dismiss(onClosedData);
    }
    checkServer(){
    
      let server=this.select;
      // console.log(server);
      switch (server) {
        case 'http://csapi.soltystudio.com/api/v1':
        this.api.setSolty();
        
        break;
        case 'http://webapi.contentshare.biz/api/v1':
        this.api.setBiz();
        default:
        
        break;
      }
    }
  ngOnInit() {
  }
}
