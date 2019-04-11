import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { AlertController, NavParams} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-company-modal',
  templateUrl: './edit-company-modal.page.html',
  styleUrls: ['./edit-company-modal.page.scss'],
})
export class EditCompanyModalPage implements OnInit {
  company: Observable<any>;
  companyId: null;
  companyTab: string;
  constructor(private modalController: ModalController
    ,private alertCtrl: AlertController, 
    public router: Router, 
    public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public api: RestApiService, private navParams:NavParams) {
      this.companyTab='info';
     }

  ngOnInit() {
    
    this.getCompanyInfo();
  }




  async getCompanyInfo(){
    this.companyId=this.navParams.get('companyId');
   await this.api.getCompanyById(this.companyId).subscribe(result=>{
      this.company=result;
    })
  }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
