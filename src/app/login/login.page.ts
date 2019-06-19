import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;
  // select:string='http://csapi.soltystudio.com/api/v1';
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
    public loadingController: LoadingController,
    private storage: Storage,
    
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

    async getServers(){
      const loading = await this.loadingController.create({
        message: 'Loading'
      });
      await loading.present();
      await this.api.checkServer(this.userEmail).subscribe(info=>{this.servers=info
        console.log(this.servers);   
      });  
      loading.dismiss();
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
    
  }
  