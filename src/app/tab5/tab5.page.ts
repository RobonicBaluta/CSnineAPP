import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { Profile } from 'selenium-webdriver/firefox';
import { FormGroup, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController) { 


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
       // window.location.reload();
        //this.router.navigate(['/home']);

  }

  async getProfile() {
 return this.api.getProfile().subscribe(profile=>{this.info=profile
console.log(this.info)});

    
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

}
