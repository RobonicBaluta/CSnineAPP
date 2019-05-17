import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;
  select:string='http://csapi.soltystudio.com/api/v1';
  
  constructor(public api: RestApiService,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService 
    ){
      
    }
    
    @ViewChild('myNav') nav: NavController
    async presentAlert() {
      
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'The email or the password that you have written are wrong',
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
    
    ngOnInit() {
      this.credentialsForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
    
    onSubmit() {
      this.authService.login(this.credentialsForm.value).subscribe();
    }
    
    // soltyStudio(){
    //   this.api.setSolty();
    // }
    // csBiz(){
    //   this.api.setBiz();
      
    // }
    
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
    
  }
  