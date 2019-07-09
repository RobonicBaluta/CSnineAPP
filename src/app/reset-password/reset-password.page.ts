import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavParams, ModalController, LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  reset: FormGroup;
  select:string='http://csapi.soltystudio.com/api/v1';
  userEmail: any;
  servers: any;
  constructor( private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private modalController: ModalController,
    public loadingController: LoadingController,
    public api: RestApiService,  ) {
      
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.userEmail = this.router.getCurrentNavigation().extras.state.email;
          console.log('email: '+this.userEmail);
        }
      });

      this.reset = this.formBuilder.group({
        'email' : [null],
        'securityPin' : [null],
      });}
    

  @ViewChild('myNav') nav: NavController
    async presentAlert() {
      
      const alert = await this.alertCtrl.create({
        header: 'Security',
        cssClass: 'alert',
        message: 'Prüfen Sie Ihren Posteingang!',
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
    // checkServer(){
    
    //   let server=this.select;
    //   // console.log(server);
    //   switch (server) {
    //     case 'https://csapi.soltystudio.com/api/v1':
    //     this.api.setSolty();
        
    //     break;
    //     case 'https://webapi.contentshare.biz/api/v1':
    //     this.api.setBiz();
    //     default:
        
    //     break;
    //   }
    // }

    async getServers(){
      this.servers=this.api.getServers();
      console.log(this.servers);
    }
    
    
    async checkServer(server){
      
      
      console.log(server);
      switch (server) {
        
        case 'CS Test Solty':
        
        this.authService.storage.set('server',server);
        //  this.authService.storage.get('server').then((val) => {
        //     console.log('Your server is', val);
        //   });
        this.api.setSolty();
        
        break;
        case 'Internal CS':
        console.log('biz: '+server);
        
        this.authService.storage.set('server',server);
        // console.log('Your server issss', this.authService.storage.get('server'));
        // this.authService.storage.get('server').then((val) => {
        //   console.log('Your server is', val);
        // });
        this.api.setBiz();
        default:
        
        break;
      }
    }
  ngOnInit() {
    this.getServers();
  }
}
