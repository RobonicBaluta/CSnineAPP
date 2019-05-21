import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { Profile } from 'selenium-webdriver/firefox';
import { FormGroup, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, Events, Platform, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  
  info: Observable<any>;
  company=null;
  profileForm: FormGroup;
  
  constructor(private activatedRoute: ActivatedRoute,
    public api: RestApiService,
    public router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private events:Events,
    public platform: Platform,
    public navctrl: NavController,
    public loadingController: LoadingController) { 

    this.navctrl.navigateBack;
    /*platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigateByUrl("");
    });*/


      
      this.profileForm = this.formBuilder.group({
        'mobile':[null],
        'street':[null],
        'city':[null],
        'region':[null],
        'country':[null],
        'zip':[null],
        'fax':[null],
        
      });
    }
    
    ngOnInit() {
      
      this.getProfile();
      // this.getCompanyInfo(id);
    }
    
    async updateProfile(){
      console.log(this.profileForm.value);
      await this.api.updateProfile(this.profileForm.value).subscribe();
      
      this.presentAlert();
      this.doRefresh(this.events);
      // window.location.reload();
      //this.router.navigate(['/home']);
      
    }
    
    async getProfile() {
      // const loading = await this.loadingController.create({
      //   message: 'Loading'
      // });
      // await loading.present();
      return this.api.getProfile().subscribe(profile=>{this.info=profile
        // loading.dismiss()
      });   
    }
    
    // async getCompanyInfo(id:number){
    
    //   this.api.getCompanyById(id).subscribe(result=>{
    //     this.company=result;
    //   })
    // }
    
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Changes succesfully saved',
        buttons: ['OK']
      });
      
      await alert.present();
    }
    doRefresh(event) {
      this.getProfile();
      console.log('Begin async operation');
      
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
    
    
  }
  