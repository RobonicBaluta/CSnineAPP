import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;
  select:string='http://csapi.soltystudio.com/api/v1';
  servers: any;
  userEmail:string;
  sub: any;
  
  constructor(public api: RestApiService,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ){
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.userEmail = this.router.getCurrentNavigation().extras.state.email;
          console.log(this.userEmail);
        }
      });
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
        username: [{value: ''},[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
      console.log('usermail'+this.userEmail);
      this.getServers();
    }
    
    onSubmit() {
      this.authService.login(this.credentialsForm.value).subscribe();
    }
    
    soltyStudio(){
      this.api.setSolty();
    }
    csBiz(){
      this.api.setBiz();
      
    }
    showServer(){
      console.log('eeeeeee');
      
    }
   async getServers(){
    this.servers= this.api.getServers();
    }


    async checkServer(server){
    
    console.log('hello');
     console.log(server);
      switch (server) {
        case 'CS Test Solty':
        this.api.setSolty();
        
        break;
        case 'Internal CS':
        this.api.setBiz();
        default:
        
        break;
      }
    }
    
  }
  